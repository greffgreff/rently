import Styling from '../styles/logo.module.css';

export default function Logo() {
  return (
    <Link href="/">
      <div className={Styling.logo}>
        <div className={Styling.text}>Rently.io</div>
      </div>
    </Link>
  );
}
