import Link from 'next/link';
import Styling from '../styles/button.module.css';

export default function ButtonSecondary({ icon, text, route, width }) {
  return (
    <Link href={(route == null) | (route == '') ? '/' : route}>
      <button type="button" className={`${Styling.btn} ${Styling.secondary}`} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: (icon == null) | (icon == '') ? 'none' : '' }} />
        {text}
      </button>
    </Link>
  );
}
