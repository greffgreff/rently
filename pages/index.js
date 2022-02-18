import Head from 'next/head'
import NavigationBar from '../components/NavigationBar'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavigationBar />
      </main>
    </>
  )
}
