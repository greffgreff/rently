import Styling from '../styles/navigationBar.module.css';
import Button from './button';
import ButtonLink from './buttonLink';
import ButtonSecondary from './buttonSecondary';
import Logo from './logo';

export default function NavigationBar() {
  const authed = false;
  return (
    <div className={Styling.container}>
      <div className={Styling.content}>
        <div className={Styling.navItemsContainer}>
          <Logo />
          <Button icon={'fa fa-plus'} text={'Lease something'} route={'/lease'} />
          <ButtonLink icon={'fa fa-search'} text={'Search'} route={'/adverts'} />
        </div>
        <div className={Styling.navItemsContainer}>
          {authed ? (
            <>
              <ButtonLink text={'messages'} />
              <ButtonLink text={'notification'} />
              <Button text={'Account'} icon={'fa fa-user'} />
            </>
          ) : (
            <ButtonSecondary text={'Login'} route={'/login'} />
          )}
        </div>
      </div>
    </div>
  );
}
