import Styling from '../styles/account.module.css';
import Head from 'next/head';
import { Meta, NavigationBar, Button } from '../components'

export default function Account() {
  return (
    <>
      <Head>
        <title>Rently.io - Find what you need</title>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.tabs}>
            <div className={`${Styling.tab} ${Styling.mainTab}`}>My profile</div>
            <div className={Styling.tab}>Rentals</div>
            <div className={Styling.tab}>Adverts</div>
            <div className={Styling.tab}>Messages</div>
            <div className={Styling.tab}>Notifications</div>
          </div>
          <div className={Styling.settingsContainer}>
            <div className={Styling.header}>
              <h1>My profile</h1>
              <Button text={'Save changes'} />
            </div>

            <div className={Styling.settingsInputs}>
              <div>
                <p>Display name</p>
                <input className={Styling.input} id="username" placeholder="Username" />
              </div>
              <div>
                <p>Full name</p>
                <input className={Styling.input} id="fullname" placeholder="Full name" />
              </div>
              <div>
                <p>Email address</p>
                <input className={Styling.input} id="email" placeholder="Email" />
              </div>
              <div>
                <p>Phone number</p>
                <input className={Styling.input} id="phone" placeholder="Phone" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
