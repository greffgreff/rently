import Styling from './listingPage.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Meta, NavigationBar, Map } from '../../components'
import { Listing } from '../../types'
import moment from 'moment'

export default function ListingPage({ data }) {
  if (data === 'Not found') {
    useRouter().push('/')
  }

  const listing: Listing = data

  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <div className={Styling.descArea}>
              <img className={Styling.image} src={listing.image} />

              <div>
                <div className={Styling.title}>{listing.name}</div>
                <div className={Styling.details}>
                  <div className={Styling.price}>
                    <b>Daily price </b>
                    {listing.price}€
                  </div>
                  <div className={Styling.date}>
                    <b>Available since </b>
                    {moment.unix(listing.createAt).format('MM/DD/YYYY HH:mm:ss')}
                  </div>
                </div>

                <div className={Styling.details}>
                  <h3>About this listing</h3>
                  <div>{listing.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            {/* <h2>Who is leasing this</h2> */}

            <div>{listing.lon}</div>
            <div>{listing.lat}</div>
          </div>
        </div>

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
              {/* <h2>Where can I find this</h2> */}

              <Map lat={listing.lat} lon={listing.lon} />
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query
  const req = await fetch(`https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert/${id}`)
  const data = await req.json()
  return { props: { data } }
}
