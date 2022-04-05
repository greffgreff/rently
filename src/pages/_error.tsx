import Styling from './styles/error.module.css'
import Head from 'next/head'
import { Meta, NavigationBar } from '../components'
import { useRouter } from 'next/router'

export default function Error() {
  const { ex } = useRouter().query
  const { status } = useRouter().query

  return (
    <>
      <Head>
        <title>Sorry for the trouble...</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <h1 className={Styling.code}>{status ?? 404}</h1>
          <h1 className={Styling.msg}>{ex ?? 'Not found...'}</h1>
        </div>
      </main>
    </>
  )
}
