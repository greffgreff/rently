import Head from 'next/head'
import { NavigationBar } from '../components'
import { Advert } from '../types'

export default function AdvertPage(advert: Advert) {
  return (
    <>
      <Head>
        <title>Rently.io</title>
      </Head>

      <NavigationBar />
      <main>
        <h1>{advert.name}</h1>
        <h3>{advert.desc}</h3>
        <b>{advert.price}</b>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const req = await fetch('https://6219106881d4074e85a0b85e.mockapi.io/api/v1/test/1')
  const data : Advert = await req.json()
  return { props: { data } }
}
