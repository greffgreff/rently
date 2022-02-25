import Head from 'next/head';
import NavigationBar from '../components/navigationBar';

export default function AdvertPage({ data }) {
  return (
    <>
      <Head>
        <title>Rently.io</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <NavigationBar />
      <main>
        <h1>{data.title}</h1>
        <h3>{data.desc}</h3>
        <b>{data.price}</b>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = {
    title: "This is a title",
    desc: "This is the post's description",
    price: "10 euro/day"
  }

  return { props: { data } }
}