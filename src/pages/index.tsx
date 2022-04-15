import Styling from './styles/index.module.css'
import Head from 'next/head'
import { Marquee, Meta, NavigationBar, SearchBar } from '../components'
import { Listing } from '../types'
import { getRandomListings } from '../api'

export default function Index({ listings }: { listings: Listing[] }) {
  const seconds = 100

  return (
    <>
      <Head>
        <title>Rent what you need on Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        {listings ? <Marquee listings={listings.reverse()} seconds={seconds} /> : null}
        <SearchBar />
        {listings ? <Marquee listings={listings} seconds={seconds} reversed /> : null}
      </main>
    </>
  )
}

export async function getServerSideProps() {
  let listings = null
  try {
    listings = await getRandomListings(100)
  } catch (e) {
    console.log(e)
  }
  return { props: { listings } }
}
