import Link from 'next/link';
import Styling from '../styles/logoAlt.module.css';

export default function LogoAlt() {
  return (
    <Link href="/">
      <div className={Styling.logo}>
        <div className={Styling.text}>Rently</div>
      </div>
    </Link>
  );
}
