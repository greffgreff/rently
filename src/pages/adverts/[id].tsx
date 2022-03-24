import Head from 'next/head'
import { useRouter } from 'next/router'
import { Meta, NavigationBar } from '../../components'
import { Advert } from '../../types'

export default function AdvertPage({ data }) {
  if (data === 'Not found') {
    useRouter().push('/')
  }

  const advert: Advert = data

  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div>
          <h1>{advert.name}</h1>
          <h1>{advert.desc}</h1>
          <h1>{advert.price}</h1>
          <h1>{advert.id}</h1>
          <h1>{advert.image}</h1>
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
