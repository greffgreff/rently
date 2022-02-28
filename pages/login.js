import Styling from '../styles/login.module.css';
import Head from 'next/head';
import Meta from '../components/meta';
import Link from 'next/link';
import Input from '../components/input';
import Button from '../components/button';

export default function Login() {
  return (
    <>
      <Head>
        <title>Rently.io - Login</title>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <Meta />

        <div className={Styling.container}>
          <div className={Styling.innerContainer}>
            <h1>Login</h1>

            <div className={Styling.login}>
              <div className={Styling.inputs}>
                <p>Username</p>
                <Input placeholder={'Username'} />
                <p>Password</p>
                <Input placeholder={'Password'} />
              </div>

              <div className={Styling.btn}>
                <Button text={'Sign in'} width={'100%'} />
              </div>

              <p className={Styling.help}>Forgot username or password?</p>
            </div>

            <div className={Styling.options}>
              <Link href={'/'}>
                <div className={Styling.back}>
                  <i className={`fas fa-angle-left ${Styling.arrow}`} />
                  Back
                </div>
              </Link>

              <div className={Styling.back}>
                Register
                <i className={`fas fa-angle-right ${Styling.arrow}`} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
