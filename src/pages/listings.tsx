import Styling from './styles/listings.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ListingCard, NavigationBar, SearchBar, Select, Spoiler, Meta } from '../components'
import { Listing } from '../types'

export default function Listings({ data }) {
  if (data === 'Not found') {
    useRouter().push('/')
  }

  const { search } = useRouter().query
  const listings: Listing[] = data

  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        <SearchBar prevSearch={search} />
        <Select options={['Sarreguemines', 'Remelfing', 'Hambach', 'Zetting']} />
        {search ? <Spoiler search={search} /> : null}

        <div className={Styling.resultsContainer}>
          {search ? (
            <div className={Styling.resultsMeta} style={{ display: search ? '' : 'none !important' }}>
              <div>Showing results for "{search}"</div>
              <div>{listings.length} result(s)</div>
            </div>
          ) : null}

          <div className={Styling.results}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { search } = query
  const req = await fetch(`https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert/`)
  const data = await req.json()
  return { props: { data } }
}
