import Head from 'next/head';
import NavigationBar from '../components/navigationBar';

export default function AdvertPage({ advert }) {
  return (
    <>
      <Head>
        <title>Rently.io</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <NavigationBar />
      <main>
        <h1>{advert.title}</h1>
        <h3>{advert.desc}</h3>
        <b>{advert.price}</b>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const req = await fetch('https://6219106881d4074e85a0b85e.mockapi.io/api/v1/test/1')
  const data = await req.json()
  return { props: { advert: data } }
}