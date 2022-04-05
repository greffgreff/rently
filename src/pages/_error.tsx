import Styling from './styles/error.module.css'
import Head from 'next/head'
import { Meta, NavigationBar } from '../components'
import { useRouter } from 'next/router'

export default function Error() {
  const router = useRouter()
  const { msg } = router.query
  const { code } = router.query

  return (
    <>
      <Head>
        <title>Sorry for the trouble...</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <h1 className={Styling.code}>{code === 'undefined' || !code ? 404 : code}</h1>
          <h1 className={Styling.msg}>{msg === 'undefined' || !msg ? 'Not found' : msg}</h1>
        </div>
      </main>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}