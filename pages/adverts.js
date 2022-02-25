import Head from 'next/head';
import Styling from '../styles/adverts.module.css';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

export default function Adverts() {
  const router = useRouter()
  var { results } = router.query
  var count = isNaN(parseInt(results))  ? 10 : parseInt(results)

  console.log(count)
  return (
    <>
      <Head>
        <title>Rently.io - Listings</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <div>
        <NavigationBar />
        <main>
          <SearchBar />
          <div className={Styling.results}>
            <div className={Styling.searchOptions} style={{ display: (count < 10) ? 'none' : '' }} >
              <p>Place</p>
              <p>Rate</p>
              <p>Period</p>
            </div>
            {[...Array(count)].map((_) => (
              <AdvertCard key={uuidv4()} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
