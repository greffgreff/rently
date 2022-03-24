import Head from 'next/head'
import { Meta, NavigationBar } from '../../components'
import { Advert } from '../../types'

export default function AdvertPage({ data }: { data: Advert }) {
  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div>
          <h1>{data.name}</h1>
          <h1>{data.desc}</h1>
          <h1>{data.price}</h1>
          <h1>{data.id}</h1>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query
  const req = await fetch(`https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert/${id}`)
  const data: Advert = await req.json()
  return { props: { data } }
}
