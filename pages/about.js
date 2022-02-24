import Head from 'next/head';
import NavigationBar from '../components/navigationBar';

export default function About() {
  return (
    <>
      <Head>
        <title>About Rently</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <main>
        <NavigationBar />
        <p>This is the about page</p>
      </main>
    </>
  );
}
