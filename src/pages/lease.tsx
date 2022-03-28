import Styling from './styles/lease.module.css'
import Head from 'next/head'
import { Button, ButtonSecondary, Meta, NavigationBar, Map } from '../components'
import { useSession } from 'next-auth/react'
import { FormEvent, useRef, useState } from 'react'
import { ProperAddress, Session } from '../types'
import { fetchAddressTomTom, postListing } from '../api'
import { getSession } from 'next-auth/react'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { ServerResponse } from 'http'
import jwt from 'jsonwebtoken'
import { getToken } from 'next-auth/jwt'

export default function LeasePage({ _jwt }) {
  const { data: session } = useSession()
  const userData: Session = session
  const [address, setAddress] = useState<ProperAddress>(null)
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    postListing(
      {
        id: uuid(),
        name: title.current.value,
        desc: desc.current.value,
        price: price.current.value,
        image: null,
        startDate: start.current.value,
        endDate: end.current.value,
        createAt: moment().date(),
        address: {
          id: uuid(),
          city: city.current.value,
          zip: zip.current.value,
          country: country.current.value,
        },
        leaser: {
          id: uuid(),
          name: userData.user.name,
          email: userData.user.email,
          phone: phone.current.value,
        },
      },
      _jwt
    )
    // router.push('/listings/{id}')
  }

  return (
    <>
      <Head>
        <title>Rently.io - Lease</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <form onSubmit={(event) => handleSubmit(event)}>
          <div className={Styling.container}>
            <div className={Styling.innerContainer}>
              <h1 className={Styling.title}>About my lease</h1>
              <h4 className={Styling.title}>Give some basic information about the item. Make it exciting!</h4>

              <div className={Styling.leasingContainer}>
                <image className={Styling.image} />

                <div>
                  <div className={Styling.columnInputs}>
                    <div className={Styling.labeledInput}>
                      <p>Give your advert a name:</p>
                      <input required className={Styling.input} ref={title} placeholder="Title" />
                    </div>

                    <div className={Styling.labeledInput}>
                      <p>Daily charge:</p>
                      <input required min="0" type="number" ref={price} className={Styling.input} />
                    </div>

                    <div className={Styling.labeledInput}>
                      <p>Lease start date:</p>
                      <input required type="date" className={Styling.input} ref={start} />
                    </div>

                    <div className={Styling.labeledInput}>
                      <p>Lease end date:</p>
                      <input required type="date" className={Styling.input} ref={end} />
                    </div>

                    <div className={`${Styling.labeledInput} ${Styling.textArealabeledInput}`}>
                      <p>Provide a description for renters:</p>
                      <textarea required className={`${Styling.input} ${Styling.textarea}`} ref={desc} placeholder="I'm not going to use my trailer for a few days..." />
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
                  <input required className={Styling.input} ref={country} placeholder="Netherlands" />
                </div>

                <div className={Styling.labeledInput}>
                  <p>Zipcode:</p>
                  <input required className={Styling.input} ref={zip} placeholder="BZ5600" />
                </div>

                <div className={Styling.labeledInput}>
                  <p>City:</p>
                  <input required className={Styling.input} ref={city} placeholder="Eindhoven" />
                </div>

                <div className={Styling.labeledInput}>
                  <p>Street name and number:</p>
                  <input required className={Styling.input} ref={street} placeholder="123" />
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
                  <input className={Styling.input} defaultValue={userData?.user.name ?? ''} disabled />
                </div>

                <div className={Styling.labeledInput}>
                  <p>Email:</p>
                  <input className={Styling.input} defaultValue={userData?.user.email ?? ''} disabled />
                </div>

                <div className={Styling.labeledInput}>
                  <p>Phone number:</p>
                  <input required className={Styling.input} ref={phone} defaultValue="+1 06 12 34 56 67" />
                </div>
              </div>
            </div>
          </div>

          <div className={Styling.btns}>
            <Button submit={true} text="Place advert!" icon="fa fa-check" width="200px" />
            <ButtonSecondary text="Cancel" route="/" width="200px" />
          </div>
        </form>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session : Session = await getSession(context)
  const res: ServerResponse = context.res
  const req = context.req

  if (!session) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }

  const secret = process.env.JWT_SECRET
  const token = await getToken({ secret, req })
  const payload = {
    name: token.name,
    email: token.email,
    iat: token.iat,
    exp: token.exp,
  }
  const _jwt = jwt.sign(payload, secret, { algorithm: 'HS256' })
  return { props: { _jwt } }
}
