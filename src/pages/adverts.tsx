import Styling from './styles/adverts.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AdvertCard, NavigationBar, SearchBar, Select, Spoiler, Meta } from '../components'
import { Advert } from '../types'

export default function Adverts({ data }) {
  const { search } = useRouter().query

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
              <div>{10} result(s)</div>
            </div>
          ) : null}

          <div className={Styling.results}>
            {data.map((advert: Advert) => (
              <AdvertCard key={advert.id} advert={advert} />
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
