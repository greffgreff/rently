import Styling from '../styles/navigationBar.module.css';
import Button from './button';
import ButtonLink from './buttonLink';
import ButtonSecondary from './buttonSecondary';
import Logo from './logoAlt';

export default function NavigationBar() {
  return (
    <div className={Styling.container}>
      <div className={Styling.content}>
        <div className={Styling.navItemsContainer}>
          <Logo />
          <Button icon={'fa fa-plus'} text={'Lease something'} />
          <ButtonLink icon={'fa fa-search'} text={'Search'} route={'/adverts'} />
        </div>
        <div className={Styling.navItemsContainer}>
          <ButtonSecondary text={'Login'} />
        </div>
      </div>
    </div>
  );
}
