import './styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  useEffect(() => {
    hotjar.initialize(3012126, 6)
  }, [])
  
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
