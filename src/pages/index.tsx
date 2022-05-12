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
        <title>Rent what you need on Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        {listings && <Marquee listings={listings.reverse()} seconds={seconds} />}
        <SearchBar />
        {listings && <Marquee listings={listings} seconds={seconds} reversed />}
        
        <SuggestionCard id={'1'} name={'Listing'} desc={'Description'} price={10.2} image={''} startDate={'01/11/21'} endDate={'30/11/21'} createdAt={'01/01/12'} updatedAt={''} leaser={''} phone={''} address={undefined}  />
      </main>
    </>
  )
}
