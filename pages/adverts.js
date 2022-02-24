import Head from 'next/head';
import Styling from '../styles/adverts.module.css';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';

export default function Adverts() {
  const results = 10

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
            <div className={Styling.searchOptions} style={{ display: (results < 10) ? 'none' : '' }} >
              <p>Place</p>
              <p>Rate</p>
              <p>Period</p>
            </div>
            {[...Array(results)].map((_) => (
              <AdvertCard />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
