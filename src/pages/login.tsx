import Styling from './styles/login.module.css'
import Head from 'next/head'
import { Meta, Button } from '../components'
import { getProviders } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { Provider } from '../types'

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
              {Object.values(providers).map((provider: Provider) => (
                <div
                  key={provider.name.split(' ')[0]}
                  className={provider.name.split(' ')[0]}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: `${window.location.origin}/`,
                    })
                  }
                >
                  <Button text={provider.name.split(' ')[0]} width={'100%'} />
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

      <style jsx global>{`
        .Facebook button {
          background-color: rgb(45, 67, 136);
        }
        .Google button {
          background-color: rgb(225, 60, 60);
        }
        .Twitter button {
          background-color: rgb(52, 131, 255);
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  const providers: [Provider] = await getProviders()
  return {
    props: { providers },
  }
}
