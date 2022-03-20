import Styling from '../styles/login.module.css'
import Head from 'next/head'
import { Meta, Button } from '../components'
import { getProviders } from 'next-auth/react'
import { signIn } from 'next-auth/react'

export default function Login({ providers }) {
  return (
    <>
      <Head>
        <title>Rently.io - Login</title>
      </Head>

      <main>
        <Meta />

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1>Chose your login provider</h1>

            <div className={Styling.inputContainer}>
              {Object.values(providers).map((provider) => (
                <div
                  key={provider.name}
                  className={provider.name}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: `${window.location.origin}/`,
                    })
                  }
                >
                  <Button text={provider.name} width={'100%'} />
                </div>
              ))}
            </div>

            <div className={Styling.options}>
              <a href={'/'}>
                <div className={Styling.back}>
                  <i className={`fas fa-angle-left ${Styling.arrowLeft}`} />
                  Back
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
