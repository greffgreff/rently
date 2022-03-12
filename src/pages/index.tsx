import Styling from '../styles/index.module.css'
import Head from 'next/head'
import { FeatureCard, Marquee, Meta, NavigationBar, SearchBar } from '../components'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently.io - Find what you need</title>
        <link rel="icon" href="./public/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <main>
        <Meta />
        <NavigationBar />
        <Marquee rows={1} items={10} seconds={150} />
        <SearchBar />
        <Marquee rows={1} items={10} seconds={150} reversed={true} />
      </main>
    </>
  )
}
