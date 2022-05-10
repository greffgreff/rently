import Styling from './styles/listings.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ListingCard, NavigationBar, Meta, RefinedSearchBar } from '../components'
import { Listing } from '../types'
import Loading from '../components/other/Loading'
import { aggregatedListingsSearch } from '../api'
import Image from 'next/image'

export default function Listings({ listings }: { listings: Listing[] }) {
  const { search } = useRouter().query

  return (
    <>
      <Head>
        <title>Listings | Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        <RefinedSearchBar search={search} />

        <div className={Styling.resultsContainer}>
          {search ? (
            <div className={Styling.resultsMeta} style={{ display: search ? '' : 'none !important' }}>
              <div>Showing results for &quot;{search}&quot;</div>
              <div>{listings.length} result(s)</div>
            </div>
          ) : null}

          {listings ? (
            <div className={Styling.results}>
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <Loading />
          )}

          {listings.length == 0 ? <Image className={Styling.nothing} alt="What did the ocean say to the beach? Nothing, it just waved." src="/nothing.svg" layout="fill" /> : null}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  // FIXME move this to client side to prevent websocket thing
  const { search } = query
  const { range } = query
  const { address } = query
  let listings: Listing[] = []
  try {
    listings = (await aggregatedListingsSearch(search + (address ? '?range=' + parseInt(range ?? 0) * 1000 + '&address=' + address ?? '' : ''))).results
  } catch (e) {
    console.log(e)
  }
  return { props: { listings } }
}
