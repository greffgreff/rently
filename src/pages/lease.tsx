import Styling from './styles/lease.module.css'
import Head from 'next/head'
import { Button, ButtonSecondary, Meta, NavigationBar, Map } from '../components'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Listing, ProperAddress, Session, User } from '../types'
import { fetchAddressTomTom, fetchListingById, postListing, putListing } from '../api'
import { getSession } from 'next-auth/react'
import { v4 as uuid } from 'uuid'
import { ServerResponse } from 'http'
import moment from 'moment'
import { useRouter } from 'next/router'

export default function LeasePage({ listingToUpdate }: { listingToUpdate: Listing }) {
  const { data } = useSession()
  const session : Session = data
  const [user, setUser] = useState<User>()
  const [imageFile, setImage] = useState<string>()
  const [address, setAddress] = useState<ProperAddress>(null)
  const router = useRouter()
  const image = useRef(null)
  const country = useRef(null)
  const city = useRef(null)
  const zip = useRef(null)
  const street = useRef(null)
  const title = useRef(null)
  const price = useRef(null)
  const start = useRef(null)
  const end = useRef(null)
  const desc = useRef(null)
  const phone = useRef(null)
  const mapOptions = {
    gestureHandling: 'none',
    fullscreenControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoomControl: false,
    keyboardShortcuts: false,
    clickableIcons: false,
  }

  useEffect(() => {
    if (session) {
      setUser(session.user)
    }
  }, [session])

  const checkAddress = async () => {
    const result = await fetchAddressTomTom(country.current.value, city.current.value, zip.current.value, street.current.value)

    document.getElementById('map')!.style.marginTop = '30px'
    document.getElementById('map')!.style.opacity = '1'

    if (result) {
      document.getElementById('map')!.style.height = '300px'
      document.getElementById('map')!.style.paddingBottom = '70px'
    } else {
      document.getElementById('map')!.style.height = '30px'
      document.getElementById('map')!.style.paddingBottom = '0'
    }

    setAddress(result)
  }

  const constructListing = (id: string, address: ProperAddress): Listing => {
    return {
      id: id,
      name: title.current.value,
      desc: desc.current.value,
      price: price.current.value,
      image: imageFile?.replace(/^[^,]*,/, '') ?? listingToUpdate?.image,
      startDate: moment(start.current.value).format('X'),
      endDate: moment(end.current.value).format('X'),
      createdAt: moment().format('X'),
      updatedAt: moment().format('X'),
      leaser: user.id,
      phone: phone.current.value,
      address: {
        street: address.address.street,
        city: address.address.city,
        zip: address.address.zip,
        country: address.address.country,
        formattedAddress: address.formatedAddress,
        location: {
          type: 'Point',
          coordinates: [address.geocode.lng ?? 0, address.geocode.lat ?? 0],
        },
      },
    }
  }

  const handlePut = async () => {
    if (new Date() > session.expires) {
      document.location.reload()
    }

    const address = await fetchAddressTomTom(country.current.value, city.current.value, zip.current.value, street.current.value)

    try {
      await putListing(constructListing(listingToUpdate.id, address), session.sessionToken)
    } catch (ex) {
      console.log(ex)
      console.log(session.sessionToken)
      console.log(constructListing(listingToUpdate.id, address))
      router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
    }
    router.push('/listings/' + listingToUpdate.id)
  }

  const handlePost = async () => {
    if (new Date() > session.expires) {
      document.location.reload()
    }

    const address = await fetchAddressTomTom(country.current.value, city.current.value, zip.current.value, street.current.value)
    const listingId = uuid()

    try {
      await postListing(constructListing(listingId, address), session.sessionToken)
    } catch (ex) {
      console.log(ex)
      router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
    }
    router.push('/listings/' + listingId)
  }

  const displayImg = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 2) {
        alert('Image size exceeds 2 MiB')
      } else {
        const reader = new FileReader()
        reader.onload = (event) => {
          setImage(event.target.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Lease Something | Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>About my lease</h1>
            <h4 className={Styling.title}>Give some basic information about the item. Make it exciting!</h4>

            <div className={Styling.leasingContainer}>
              <label htmlFor="file" className={Styling.fileLabel} style={{ backgroundImage: `url(${imageFile ?? listingToUpdate?.image ?? ''})` }}>
                Choose an image
              </label>
              <input required ref={image} onChange={(event) => displayImg(event)} accept="image/png, image/jpeg" id="file" type="file" className={Styling.fileInput} />

              <div>
                <div className={Styling.columnInputs}>
                  <div className={Styling.labeledInput}>
                    <p>Give your advert a name:</p>
                    <input required className={Styling.input} ref={title} placeholder="Title" defaultValue={listingToUpdate?.name ?? 'My new listing'} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Daily charge:</p>
                    <input required min="0" type="number" ref={price} className={Styling.input} defaultValue={listingToUpdate?.price ?? 123} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Lease start date:</p>
                    <input required type="date" className={Styling.input} ref={start} defaultValue={listingToUpdate?.startDate ? new Date(parseInt(listingToUpdate.startDate) * 1000).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA')} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Lease end date:</p>
                    <input required type="date" className={Styling.input} ref={end} defaultValue={listingToUpdate?.endDate ? new Date(parseInt(listingToUpdate.endDate) * 1000).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA')} />
                  </div>

                  <div className={`${Styling.labeledInput} ${Styling.textArealabeledInput}`}>
                    <p>Provide a description for renters:</p>
                    <textarea required className={`${Styling.input} ${Styling.textarea}`} ref={desc} placeholder="I'm not going to use my trailer for a few days..." defaultValue={listingToUpdate?.desc ?? 'my desc'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>Where to pickup</h1>
            <h4 className={Styling.title}>Specify the location of the item you are attempting to lease.</h4>

            <div className={Styling.columnInputs}>
              <div className={Styling.labeledInput}>
                <p>Country:</p>
                <input required className={Styling.input} ref={country} placeholder="Netherlands" defaultValue={listingToUpdate?.address?.country ?? 'France'} />
              </div>

              <div className={Styling.labeledInput}>
                <p>Zipcode:</p>
                <input required className={Styling.input} ref={zip} placeholder="BZ5600" defaultValue={listingToUpdate?.address?.zip ?? '57200'} />
              </div>

              <div className={Styling.labeledInput}>
                <p>City:</p>
                <input required className={Styling.input} ref={city} placeholder="Eindhoven" defaultValue={listingToUpdate?.address?.city ?? 'Remelfing'} />
              </div>

              <div className={Styling.labeledInput}>
                <p>Street name and number (optional):</p>
                <input className={Styling.input} ref={street} placeholder="123" defaultValue={listingToUpdate?.address?.street ?? '5 rue des roses'} />
              </div>
            </div>

            <div id="map" className={Styling.map}>
              {address ? (
                <>
                  <p>Is this address correct?</p>
                  <p>
                    <b>{address.formatedAddress}</b>
                  </p>
                  <Map lat={address?.geocode.lat ?? 0.0} lon={address?.geocode.lng ?? 0.0} options={mapOptions} />
                </>
              ) : (
                <p>Could not find any corresponding address.</p>
              )}
            </div>

            <div className={Styling.btns} onClick={checkAddress}>
              <ButtonSecondary text="Check address" icon="fa fa-search" width="200px" />
            </div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>Contact me</h1>
            <h4 className={Styling.title}>How do we contact you? Please note that your name and email address are linked to the provider you signed in with.</h4>
            <div className={Styling.columnInputs}>
              <div className={Styling.labeledInput}>
                <p>Display name:</p>
                <input className={Styling.input} defaultValue={user?.name} disabled />
              </div>

              <div className={Styling.labeledInput}>
                <p>Email:</p>
                <input className={Styling.input} defaultValue={user?.email} disabled />
              </div>

              <div className={Styling.labeledInput}>
                <p>Phone number:</p>
                <input required className={Styling.input} ref={phone} placeholder="Renters can call me with..." defaultValue={listingToUpdate?.phone ?? '123123123'} />
              </div>
            </div>
          </div>
        </div>

        <div className={Styling.btns}>
          {!listingToUpdate ? (
            <div onClick={handlePost}>
              <Button submit={true} text="Place advert!" icon="fa fa-check" width="200px" />
            </div>
          ) : (
            <div onClick={handlePut}>
              <Button submit={true} text="Updated listing" icon="fa fa-check" width="200px" />
            </div>
          )}
          <ButtonSecondary text="Cancel" route={listingToUpdate ? '/listings/' + listingToUpdate.id : '/'} width="200px" />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session: Session = await getSession(context)
  const res: ServerResponse = context.res
  if (!session) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }

  const { id } = context.query
  let listingToUpdate: Listing = null

  if (id) {
    listingToUpdate = await fetchListingById(id)

    if (listingToUpdate && listingToUpdate.leaser != session.user.id) {
      res.writeHead(400)
      res.end()
    }
  }

  return { props: { listingToUpdate } }
}
