import Head from 'next/head';
import Styling from '../styles/adverts.module.css';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';

export default function Adverts() {
  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <div>
        <NavigationBar />
        <main className={Styling.adverts}>
          {/* <SearchBar /> */}
          <div className={Styling.results}>
            <div className={Styling.searchOptions}>
              <p>Place</p>
              <p>Rate</p>
              <p>Period</p>
            </div>
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
            <AdvertCard urgent={false} />
          </div>
        </main>
      </div>
    </>
  );
}
