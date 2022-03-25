import Styling from './styles/lease.module.css'
import Head from 'next/head'
import { Button, ButtonSecondary, Meta, NavigationBar, Map } from '../components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { ProperAddress, Session } from '../types'
import { fetchAddress } from '../api'

export default function LeasePage() {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  const userData: Session = session
  const [address, setAddress] = useState<ProperAddress>(null)
  const country = useRef(null)
  const city = useRef(null)
  const zip = useRef(null)
  const street = useRef(null)

  const checkAddress = async () => {
    const result = await fetchAddress(country.current.value, city.current.value, zip.current.value, street.current.value)

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

  return (
    <>
      <Head>
        <title>Rently.io - Lease</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>About my lease</h1>

            <div className={Styling.leasingContainer}>
              {/* <image className={Styling.image} /> */}

              <div>
                <div className={Styling.columnInputs}>
                  <div className={Styling.labeledInput}>
                    <p>Give your advert a name:</p>
                    <input className={Styling.input} placeholder="Title" />
                  </div>

                  <div className={Styling.labeledInput}>
                    <p>Daily charge:</p>
                    <input min="0" type="number" className={Styling.input} />
                  </div>
                </div>

                <div className={Styling.labeledInput}>
                  <p>Availability:</p>
                  <div className={Styling.dates}>
                    <input type="date" className={Styling.input} />
                    <input type="date" className={Styling.input} />
                  </div>
                </div>

                <div className={`${Styling.labeledInput} ${Styling.textArealabeledInput}`}>
                  <p>Provide a description for renters:</p>
                  <textarea className={`${Styling.input} ${Styling.textarea}`} placeholder="I'm not going to use my trailer for a few days..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>Where to pickup</h1>

            <div className={Styling.columnInputs}>
              <div className={Styling.labeledInput}>
                <p>Country:</p>
                <input className={Styling.input} ref={country} placeholder="Netherlands" />
              </div>

              <div className={Styling.labeledInput}>
                <p>Zipcode:</p>
                <input className={Styling.input} ref={zip} placeholder="BZ5600" />
              </div>

              <div className={Styling.labeledInput}>
                <p>City:</p>
                <input className={Styling.input} ref={city} placeholder="Eindhoven" />
              </div>

              <div className={Styling.labeledInput}>
                <p>Street name and number:</p>
                <input className={Styling.input} ref={street} placeholder="123" />
              </div>
            </div>

            <div className={Styling.btns} onClick={checkAddress}>
              <ButtonSecondary text="Check address" icon="fa fa-search" width="200px" />
            </div>

            {console.log(address)}
            <div id="map" className={Styling.map}>
              {address ? (
                <>
                  <p>Is this address correct?</p>
                  <p>
                    <b>{address.formaterAddress}</b>
                  </p>
                  <Map lat={address?.geocode.lat ?? 0.0} lon={address?.geocode.lng ?? 0.0} options={mapOptions} />
                </>
              ) : (
                <p>Could not find any corresponding address.</p>
              )}
            </div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1 className={Styling.title}>Contact me</h1>

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
                <input className={Styling.input} defaultValue="+1 06 12 34 56 67" />
              </div>
            </div>
          </div>
        </div>

        <div className={Styling.btns}>
          <Button text="Place advert!" icon="fa fa-check" width="200px" />
          <ButtonSecondary text="Cancel" route="/" width="200px" />
        </div>
      </main>
    </>
  )
}
