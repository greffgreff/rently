import Head from 'next/head'
import NavigationBar from '../components/navigationBar'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <NavigationBar />
      </main>
    </>
  )
}
