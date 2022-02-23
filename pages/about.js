import Head from "next/head";
import NavigationBar from '../components/navigationBar'

export default function About() {
  return (
    <>
      <Head>
        <title>About Rently</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <NavigationBar />
        <p>This is the about page</p>
      </main>
    </>
  );
}
