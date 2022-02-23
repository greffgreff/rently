import Head from 'next/head'
import NavigationBar from '../components/navigationBar'
import Styling from '../styles/index.module.css'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div>
        <NavigationBar />
        <main className={Styling.index}></main>
      </div>
    </>
  )
}
