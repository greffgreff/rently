import Head from 'next/head';
import Link from 'next/link';
import Styling from '../styles/button.module.css';

export default function Button({ icon, text, route }) {
  return (
    <>
      <Head>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <Link href={(route == null) | (route == '') ? '/' : route}>
        <button type="button" className={`${Styling.btn} ${Styling.primary}`}>
          <i className={`${icon} ${Styling.icon}`} style={{ display: (icon == null) | (icon == '') ? 'none' : '' }} />
          {text}
        </button>
      </Link>
    </>
  );
}
