import Styling from './styles/listings.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ListingCard, NavigationBar, Meta, RefinedSearchBar } from '../components'
import { Listing } from '../types'
import Loading from '../components/other/Loading'
import { aggregatedListingsSearch } from '../api'
import Image from 'next/image'
import QueryBuilder from '../utils/QueryBuilder'

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

          {listings.length == 0 ? <Image alt="What did the ocean say to the beach? Nothing, it just waved." src={'/nothing.svg'} width={'1000'} height={'200'} /> : null}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { search, range, address } = query

  const uri: QueryBuilder = QueryBuilder.of('').addPathVar(search)

  if (address) {
    uri.addParam('range', range).addParam('address', address)
  }

  let listings: Listing[] = []
  try {
    listings = (await aggregatedListingsSearch(uri.createURLencoded())).results
  } catch (ex) {
    console.log(ex)
  }

  return { props: { listings } }
}
