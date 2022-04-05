import Styling from './listingPage.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Map, Loading } from '../../components'
import { Listing, ProperAddress, User } from '../../types'
import { fetchAddressTomTom, fetchListingById, fetchUserById } from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

export default function ListingPage() {
  const [listing, setListing] = useState<Listing>(null)
  const [properAddress, setProperAddress] = useState<ProperAddress>(null)
  const [leaser, setLeaser] = useState<User>(null)
  const router = useRouter()
  const { id } = router.query

  // Cannot make request on server side due to still
  // unfixed issue with NextJS making multiple calls
  // on server side requests on dynamic routes in
  // Chrome. The following have been moved to
  // clientside unfrotunately

  useEffect(() => {
    if (id) {
      fetchListingById(id.toString())
        .then(setListing)
        .catch((ex: AxiosError) => {
          router.push('/error?msg=' + ex.response?.data?.message + '&code=' + ex.response?.status)
        })
    }
  }, [id])

  useEffect(() => {
    if (listing) {
      fetchAddressTomTom(listing.address.country, listing.address.city, listing.address.zip, listing.address.street).then(setProperAddress)
      fetchUserById(listing.leaser).then(setLeaser)
    }
  }, [listing])

  return (
    <>
      <Head>
        {/* <link rel="icon" href="./public/favicon.svg" /> */}
        <title>Rently.io - Listing</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        {listing ? (
          <>
            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <div className={Styling.descArea}>
                  <img className={Styling.image} src={listing.image} />

                  <div>
                    <div className={Styling.title}>{listing.name}</div>
                    <div className={Styling.details}>
                      <p>
                        <b>Daily price </b>
                        {listing.price}€
                      </p>
                      <p>
                        <b>Available since </b>
                        {listing.createdAt}
                      </p>
                    </div>

                    <div className={Styling.details}>
                      <h3>About this listing</h3>
                      <p>{listing.desc}</p>
                      <p>{listing.startDate}</p>
                      <p>{listing.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>Who is leasing this</h2>
                <p>{leaser?.name}</p>
                <p>{leaser?.email}</p>
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>Where can I find this</h2>
                <p>{properAddress?.formatedAddress}</p>
                {properAddress ? <Map lat={properAddress.geocode.lat} lon={properAddress.geocode.lng} /> : null}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  )
}
