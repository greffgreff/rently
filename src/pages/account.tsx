import Styling from './styles/account.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Button, ButtonSecondary } from '../components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Session, User } from '../types'
import { getSession } from 'next-auth/react'
import { deleteUser } from '../api'
import { ServerResponse } from 'http'
import { getToken } from 'next-auth/jwt'
import { signOut } from 'next-auth/react'
import jwt from 'jsonwebtoken'

export default function Account({ _jwt }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = useState<User>()

  // Account deletion
  const handleDelete = async () => {
    if (new Date() > session.expires) {
      document.location.reload()
    }
    await deleteUser(user.id, _jwt).then(signOut)
  }

  // Tab redirection stuff
  useEffect(() => {
    changeTab(tabSelect)
  }, [])

  useEffect(() => {
    if (session) {
      setUser(session.user)
    }
  }, [session])

  const { tab } = router.query
  const tabs = ['profile', 'rentals', 'advert', 'messages', 'notifications']
  const tabSelect: string = tab == undefined ? 'profile' : tabs.find((t) => t == tab) != undefined ? tab.toString() : 'profile'

  const hideAll = () => {
    tabs.forEach((t) => {
      document.getElementById(t)!.style.display = 'none'
      document.getElementById(t + 'Tab')!.classList.remove(Styling.mainTab)
    })
  }

  const changeTab = (name: string) => {
    hideAll()
    document.getElementById(name)!.style.display = ''
    document.getElementById(name + 'Tab')!.classList.add(Styling.mainTab)
  }

  return (
    <>
      <Head>
        <title>Rently.io - Account</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        <div className={Styling.container}>
          <div className={Styling.tabs}>
            <div id="profileTab" className={Styling.tab} onClick={() => changeTab('profile')}>
              My profile
            </div>
            <div id="rentalsTab" className={Styling.tab} onClick={() => changeTab('rentals')}>
              Rentals
            </div>
            <div id="advertTab" className={Styling.tab} onClick={() => changeTab('advert')}>
              Adverts
            </div>
            <div id="messagesTab" className={Styling.tab} onClick={() => changeTab('messages')}>
              Messages
            </div>
            <div id="notificationsTab" className={Styling.tab} onClick={() => changeTab('notifications')}>
              Activity
            </div>
          </div>

          <div className={Styling.settingsContainer}>
            <div id="profile">
              <div className={Styling.header}>
                <h1>My profile</h1>
                <div>
                  <div onClick={handleDelete}>
                    <ButtonSecondary text={'Delete Account'} />
                  </div>
                </div>
              </div>

              <div className={Styling.settingsInputs}>
                <div>
                  <p>Display name</p>
                  <input className={Styling.input} id="username" placeholder="Username" defaultValue={user?.name ?? ''} disabled={true} />
                </div>
                <div>
                  <p>Full name</p>
                  <input className={Styling.input} id="fullname" placeholder="Full name" defaultValue={user?.name ?? ''} disabled={true} />
                </div>
                <div>
                  <p>Email address</p>
                  <input className={Styling.input} id="email" placeholder="Email" defaultValue={user?.email ?? ''} disabled={true} />
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

export async function getServerSideProps(context) {
  const session: Session = await getSession(context)
  const res: ServerResponse = context.res

  if (!session) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }

  const req = context.req
  const secret = process.env.JWT_SECRET
  const token = await getToken({ secret, req })
  const _jwt = jwt.sign(token, secret, { algorithm: 'HS256' })

  return { props: { _jwt } }
}
