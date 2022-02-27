import Head from 'next/head';
import Styling from '../styles/adverts.module.css';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Input from '../components/input';

export default function Adverts() {
  const router = useRouter();
  const { search } = router.query;
  const { results } = router.query;
  const count = isNaN(parseInt(results)) ? 10 : parseInt(results);

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
          <SearchBar prevSearch={search} />
          <Input options={ ["Sarreguemines", "Remelfing", "Hambach", "Zetting"] } />

          <div className={Styling.resultsMeta} style={{ display: search != null & search != '' ? '' : 'none !important' }}>
            <p>Showing results for "{search}"</p>
            <p>{count} result(s)</p>
          </div>

          <div className={Styling.spoiler}>
            <input type="checkbox" id="spoiler_" className={Styling.spoilerInput} />
            <label for="spoiler_">show suggestions</label>
            <div className={Styling.spoilerContent}>Some text</div>
          </div>

          <div className={Styling.results}>
            {[...Array(count)].map((_) => (
              <AdvertCard key={uuidv4()} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
