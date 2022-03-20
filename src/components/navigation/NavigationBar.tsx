import Styling from './styles/navigationBar.module.css'
import { Button, ButtonLink, ButtonSecondary, Logo } from '../index'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function NavigationBar() {
  const { data: session, status } = useSession()

  return (
    <div className={Styling.container}>
      <div className={Styling.content}>
        <div className={Styling.navItemsContainer}>
          <Logo />
          <Button icon={'fa fa-plus'} text={'Lease something'} route={'/lease'} />
          <ButtonLink icon={'fa fa-search'} text={'Search'} route={'/adverts'} />
        </div>
        <div className={Styling.navItemsContainer}>
          {status === "authenticated" ? (
            <>
              {/* <ButtonLink text={'Messages'} route={'/account?tab=messages'} /> */}
              {/* <ButtonLink text={'Activity'} route={'/account?tab=notifications'} /> */}
              <Button text={'Account'} icon={'fa fa-user'} route={'/account'} />
              <div onClick={signOut}>
                <ButtonSecondary text={'Sign out'} />
              </div>
            </>
          ) : (
            // <ButtonSecondary text={'Login'} route={'/login'} />
            <div onClick={signIn}>
              <Button text={'Login'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
