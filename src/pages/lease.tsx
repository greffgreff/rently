import Styling from './styles/lease.module.css'
import Head from 'next/head'
import { Button, ButtonSecondary, Meta, NavigationBar, Map } from '../components'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { Listing, ProperAddress, Session, User } from '../types'
import { fetchAddressTomTom, fetchListingById, postListing, putListing } from '../api'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import { v4 as uuid } from 'uuid'
import { ServerResponse } from 'http'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { useRouter } from 'next/router'

export default function LeasePage({ _jwt, listingToUpdate }: { _jwt: string; listingToUpdate: Listing }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<User>()
  const [address, setAddress] = useState<ProperAddress>(null)
  const router = useRouter()
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
      image: null,
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
      await putListing(constructListing(listingToUpdate.id, address), _jwt)
    } catch (ex) {
      router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
    }
    router.push('/listings/' + listingToUpdate.id)
  }

  const handlePosting = async () => {
    if (new Date() > session.expires) {
      document.location.reload()
    }

    const address = await fetchAddressTomTom(country.current.value, city.current.value, zip.current.value, street.current.value)
    const listingId = uuid()

    try {
      await postListing(constructListing(listingId, address), _jwt)
    } catch (ex) {
      router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
    }
    router.push('/listings/' + listingId)
  }

  const date = new Date()
  const futureDate = date.getDate() + 3
  date.setDate(futureDate)
  const defaultValue = date.toLocaleDateString('en-CA')

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
              <img className={Styling.image} />

              <div>
                <div className={Styling.columnInputs}>
                  <div className={Styling.labeledInput}>
                    <p>Give your advert a name:</p>
                    <input required className={Styling.input} ref={title} placeholder="Title" defaultValue={listingToUpdate?.name ?? 'wefhewiufh'} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Daily charge:</p>
                    <input required min="0" type="number" ref={price} className={Styling.input} defaultValue={listingToUpdate?.price ?? 123} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Lease start date:</p>
                    <input required type="date" className={Styling.input} ref={start} defaultValue={listingToUpdate?.startDate ?? defaultValue} />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Lease end date:</p>
                    <input required type="date" className={Styling.input} ref={end} defaultValue={listingToUpdate?.endDate ?? defaultValue} />
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
                <input className={Styling.input} ref={street} placeholder="123" defaultValue={listingToUpdate?.address?.street ?? '5 ru des roses'} />
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
            <div onClick={handlePosting}>
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

  const req = context.req
  const secret = process.env.JWT_SECRET
  const token: any = await getToken({ secret, req })
  const payload = {
    sub: token?.user.id,
    iat: token?.iat,
    exp: token?.exp,
    jti: token?.jti,
  }
  const _jwt = jwt.sign(payload, secret, { algorithm: 'HS256' })

  const { id } = context.query
  let listingToUpdate: Listing = null

  if (id) {
    listingToUpdate = await fetchListingById(id)

    if (listingToUpdate && listingToUpdate.leaser != token.user.id) {
      res.writeHead(400)
      res.end()
    }
  }

  return { props: { _jwt, listingToUpdate } }
}
