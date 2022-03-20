import Styling from './styles/index.module.css'
import Head from 'next/head'
import { FeatureCard, Marquee, Meta, NavigationBar, SearchBar } from '../components'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently.io - Rent what you need</title>
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
