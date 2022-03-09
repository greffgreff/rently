import Styling from '../styles/navigationBar.module.css';
import Button from './Button';
import ButtonLink from './ButtonLink';
import ButtonSecondary from './ButtonSecondary';
import Logo from './Logo';

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
              <ButtonLink text={'notifications'} />
              <Button text={'Account'} icon={'fa fa-user'} route={'/account'} />
            </>
          ) : (
            <ButtonSecondary text={'Login'} route={'/Login'} />
          )}
        </div>
      </div>
    </div>
  );
}
