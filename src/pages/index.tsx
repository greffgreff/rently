import Styling from './styles/index.module.css'
import Head from 'next/head'
import { Marquee, Meta, NavigationBar, SearchBar } from '../components'
import { Listing } from '../types'

export default function Index({ data }) {
  const listings: Listing[] = data
  const seconds = 1500

  return (
    <>
      <Head>
        <title>Rent what you need on Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        <Marquee listings={listings.reverse()} seconds={seconds} />
        <SearchBar />
        <Marquee listings={listings} seconds={seconds} reversed={true} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const req = await fetch(`https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert/`)
  const data = await req.json()
  return { props: { data } }
}
