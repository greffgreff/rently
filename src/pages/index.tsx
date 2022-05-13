import Styling from './styles/index.module.css'
import Head from 'next/head'
import { Marquee, Meta, NavigationBar, SearchBar, SuggestionCard } from '../components'
import { Listing } from '../types'
import { getRandomListings } from '../api'
import { useEffect, useState } from 'react'

export default function Index() {
  const [listings, setListings] = useState<Listing[]>([])
  const seconds = 100

  useEffect(() => {
    getRandomListings(100).then(setListings).catch(console.log)
  }, [])

  return (
    <>
      <Head>
        <title>All you can rent!</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        {listings && <Marquee listings={listings.reverse()} seconds={seconds} />}
        <SearchBar />
        {listings && <Marquee listings={listings} seconds={seconds} reversed />}
      </main>
    </>
  )
}
