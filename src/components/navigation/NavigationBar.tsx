import Styling from './styles/navigationBar.module.css'
import { Button, ButtonLink, ButtonSecondary, Logo } from '../index'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function NavigationBar() {
  const { status } = useSession()

  const logout = async () => {
    await signOut()
    useRouter().push('/')
  }

  return (
    <div className={Styling.container}>
      <div className={Styling.content}>
        <div className={Styling.navItemsContainer}>
          <Logo />
          <Button icon={'fa fa-plus'} text={'Lease something'} route={'/lease'} />
          <ButtonLink icon={'fa fa-search'} text={'Search'} route={'/adverts'} />
        </div>
        <div className={Styling.navItemsContainer}>
          {status === 'authenticated' ? (
            <>
              <Button text={'Account'} icon={'fa fa-user'} route={'/account'} />
              <div onClick={logout}>
                <ButtonSecondary text={'Sign out'} />
              </div>
            </>
          ) : (
            <div onClick={signIn}>
              <Button text={'Login'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
