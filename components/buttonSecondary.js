import Link from 'next/link';
import Styling from '../styles/button.module.css';

export default function ButtonSecondary({ icon, text, route }) {
  return (
    <Link href={(route == null) | (route == '') ? '/' : route}>
      <button type="button" className={`${Styling.btn} ${Styling.secondary}`}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: (icon == null) | (icon == '') ? 'none' : '' }} />
        {text}
      </button>
    </Link>
  );
}
