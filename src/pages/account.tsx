import Styling from '../styles/account.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Button, ButtonSecondary } from '../components'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect } from 'react'

export default function Account() {
  const router = useRouter()
  const { search } = router.query

  useEffect(() => {
    hideAll()
    showProfile()
  }, [])

  const hideAll = () => {
    document.getElementById('profile')!.style.display = 'none'
    document.getElementById('profileTab')!.classList.remove(Styling.mainTab)
    document.getElementById('rentals')!.style.display = 'none'
    document.getElementById('rentalsTab')!.classList.remove(Styling.mainTab)
    document.getElementById('adverts1')!.style.display = 'none'
    document.getElementById('advertsTab')!.classList.remove(Styling.mainTab)
    document.getElementById('messages')!.style.display = 'none'
    document.getElementById('messagesTab')!.classList.remove(Styling.mainTab)
    document.getElementById('notifications')!.style.display = 'none'
    document.getElementById('notificationsTab')!.classList.remove(Styling.mainTab)
  }

  const showProfile = () => {
    document.getElementById('profile')!.style.display = ''
    document.getElementById('profileTab')!.classList.add(Styling.mainTab)
  }

  const changeTab = (name: string, tab: string) => {
    hideAll()
    document.getElementById(name)!.style.display = ''
    document.getElementById(tab)!.classList.add(Styling.mainTab)
  }

  return (
    <>
      <Head>
        <title>Rently.io - Account</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.tabs}>
            <div id='profileTab' className={Styling.tab} onClick={() => changeTab('profile', 'profileTab')}>My profile</div>
            <div id='rentalsTab' className={Styling.tab} onClick={() => changeTab('rentals', 'rentalsTab')}>Rentals</div>
            <div id='advertsTab' className={Styling.tab} onClick={() => changeTab('adverts1', 'advertsTab')}>Adverts</div>
            <div id='messagesTab' className={Styling.tab} onClick={() => changeTab('messages', 'messagesTab')}>Messages</div>
            <div id='notificationsTab' className={Styling.tab} onClick={() => changeTab('notifications', 'notificationsTab')}>Activity</div>
          </div>

          <div className={Styling.settingsContainer}>
            <div id="profile">
              <div className={Styling.header}>
                <h1>My profile</h1>
                <div>
                  <Button text={'Save changes'} />
                  <ButtonSecondary text={'Logout'} />
                </div>
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
                <div>
                  <p>Password</p>
                  <input className={Styling.input} id="email" placeholder="Email" />
                </div>
                <div>
                  <p>Confirm password</p>
                  <input className={Styling.input} id="phone" placeholder="Phone" />
                </div>
              </div>
            </div>

            <div id="rentals">
              <div className={Styling.header}>
                <h1>My rentals</h1>
              </div>

            </div>


            <div id="adverts1">
              <div className={Styling.header}>
                <h1>My adverts</h1>
              </div>

            </div>

            <div id="messages">
              <div className={Styling.header}>
                <h1>Messages</h1>
              </div>

            </div>

            <div id="notifications">
              <div className={Styling.header}>
                <h1>Activity</h1>
                <Button text={'Mark as seen'} />
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}
