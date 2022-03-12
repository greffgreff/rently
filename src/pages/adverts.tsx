import Styling from '../styles/adverts.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AdvertCard, NavigationBar, SearchBar, Select, Spoiler, Meta } from '../components'
import { useEffect, useState } from 'react'
import { fetchAdverts } from '../api'
import { Advert } from '../types'

export default function Adverts() {
  const { search } = useRouter().query
  const [adverts, setAdverts] = useState<Advert[]>([])

  useEffect(() => {
    fetchAdverts().then(setAdverts)
  }, [])

  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        <SearchBar prevSearch={search} />
        <Select options={['Sarreguemines', 'Remelfing', 'Hambach', 'Zetting']} />
        {search ? <Spoiler search={search} /> : null}
        
        <div className={Styling.resultsContainer}>
          {search ? <div className={Styling.resultsMeta} style={{ display: search ? '' : 'none !important' }}>
            <div>Showing results for "{search}"</div>
            <div>{10} result(s)</div>
          </div> : null}

          <div className={Styling.results}>
            {adverts.map(advert => (
              <AdvertCard key={advert.id} advert={advert} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
