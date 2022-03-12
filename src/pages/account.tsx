import Styling from '../styles/account.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Button, ButtonSecondary } from '../components'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Account() {  
  const router = useRouter()
  const { tab } = router.query
  const tabs = ['profile', 'rentals', 'advert', 'messages', 'notifications']
  const tabSelect : string = tab == undefined ? 'profile' : tabs.find(t => t == tab) != undefined ? tab.toString() : 'profile'

  console.log(tabSelect)
  
  useEffect(() => {
    changeTab(tabSelect)
  }, [])
    
  const hideAll = () => {
    tabs.forEach(t => {
      document.getElementById(t)!.style.display = 'none'
      document.getElementById(t+'Tab')!.classList.remove(Styling.mainTab)
    })
  }

  const changeTab = (name: string) => {
    hideAll()
    document.getElementById(name)!.style.display = ''
    document.getElementById(name+'Tab')!.classList.add(Styling.mainTab)
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
            <div id='profileTab' className={Styling.tab} onClick={() => changeTab('profile')}>My profile</div>
            <div id='rentalsTab' className={Styling.tab} onClick={() => changeTab('rentals')}>Rentals</div>
            <div id='advertTab' className={Styling.tab} onClick={() => changeTab('advert')}>Adverts</div>
            <div id='messagesTab' className={Styling.tab} onClick={() => changeTab('messages')}>Messages</div>
            <div id='notificationsTab' className={Styling.tab} onClick={() => changeTab('notifications')}>Activity</div>
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


            <div id="advert">
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
