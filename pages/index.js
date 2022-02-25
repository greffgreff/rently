import Head from 'next/head';
import FeatureCard from '../components/featureCard';
import Marquee from '../components/marquee';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';
import Styling from '../styles/index.module.css';

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently.io - Find what you need</title>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div>
        <NavigationBar />
        <main>
          <Marquee rows={1} items={11} seconds={150} />
          <SearchBar percentageWidth={60} />
          <Marquee rows={1} items={11} seconds={150} reversed={true} />
          {/* <h1>24/7 support to keep it running smoothly</h1> */}
          {/* <div className={Styling.features}>
            <FeatureCard title={'Some title'} desc={'A somewhat short descrpition of the service'} />
            <FeatureCard title={'Some title'} desc={'A somewhat short descrpition of the service'} />
            <FeatureCard title={'Some title'} desc={'A somewhat short descrpition of the service'} />
            <FeatureCard title={'Some title'} desc={'A somewhat short descrpition of the service'} />
          </div> */}
        </main>
      </div>
    </>
  );
}
