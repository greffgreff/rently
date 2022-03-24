import Head from 'next/head'
import { useRouter } from 'next/router'
import { Meta, NavigationBar } from '../../components'
import { Listing } from '../../types'

export default function ListingPage({ data }) {
  if (data === 'Not found') {
    useRouter().push('/')
  }

  const listing : Listing = data
  
  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div>
          <h1>{listing.name}</h1>
          <h1>{listing.desc}</h1>
          <h1>{listing.price}</h1>
          <h1>{listing.id}</h1>
          <h1>{listing.image}</h1>
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
