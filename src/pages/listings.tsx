import Styling from './styles/listings.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ListingCard, NavigationBar, SearchBar, Select, Spoiler, Meta } from '../components'
import { Listing } from '../types'
import Loading from '../components/other/Loading'
import { aggregatedListingsSearch } from '../api'

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
        <SearchBar prevSearch={search} />
        <Select options={['Sarreguemines', 'Remelfing', 'Hambach', 'Zetting']} />
        {search ? <Spoiler search={search.toString()} /> : null}

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

          {listings.length == 0 ? <img className={Styling.nothing} src="nothing.svg" /> : null}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { search } = query
  let listings: Listing[] = []
  try {
    listings = (await aggregatedListingsSearch(search ?? '')).results
  } catch (e) {
    console.log(e)
  }
  return { props: { listings } }
}
