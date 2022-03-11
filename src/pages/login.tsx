import Styling from '../styles/login.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { Meta, Input, Button } from '../components'

export default function Login() {
  const showRegisterForm = (_) => {
    document.getElementById('registerForm').style.display = ''
  }

  const hideRegisterForm = (_) => {
    document.getElementById('registerForm').style.display = 'none'
  }

  return (
    <>
      <Head>
        <title>Rently.io - Login</title>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main onLoad={hideRegisterForm}>
        <Meta />

        <div className={Styling.loginContainer}>
          <div className={Styling.container}>
            <div className={Styling.innerContainer}>
              <h1>Login</h1>

              <div className={Styling.inputContainer}>
                <div className={Styling.inputs}>
                  <p>Username</p>
                  <input className={Styling.input} id="loginUsername" placeholder="Username" />
                  <p>Password</p>
                  <input className={Styling.input} id="loginPassword" placeholder="Password" />
                </div>

                <div className={Styling.btn}>
                  <Button text={'Sign in'} width={'100%'} />
                </div>

                <p className={Styling.help}>Forgot username or password?</p>
              </div>

              <div className={Styling.options}>
                <Link href={'/'}>
                  <div className={Styling.back}>
                    <i className={`fas fa-angle-left ${Styling.arrowLeft}`} />
                    Back
                  </div>
                </Link>

                <div className={Styling.back} onClick={showRegisterForm}>
                  Register
                  <i className={`fas fa-angle-right ${Styling.arrowRight}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="registerForm" className={`${Styling.container} ${Styling.registerContainer}`}>
          <div className={Styling.innerContainer}>
            <h1>Register</h1>

            <div className={Styling.inputContainer}>
              <div className={Styling.inputs}>
                <p>Email</p>
                <input className={Styling.input} id="registerEmail" placeholder="Email" />
                <p>Username</p>
                <input className={Styling.input} id="registerUsername" placeholder="Username" />
                <p>Password</p>
                <input className={Styling.input} id="registerPassword" placeholder="Password" />
                <p>Repeat password</p>
                <input className={Styling.input} id="registerRepeat" placeholder="Repeat password" />
              </div>

              <div className={Styling.btn}>
                <Button text={'Register!'} width={'100%'} />
              </div>
            </div>

            <div className={Styling.back} onClick={hideRegisterForm}>
              <i className={`fas fa-angle-left ${Styling.arrowLeft}`} />
              Login
            </div>
          </div>
        </div>

        <img className={Styling.image1} src="login-icon.svg" />
        <img className={Styling.image2} src="login-icon.svg" />
      </main>
    </>
  )
}
