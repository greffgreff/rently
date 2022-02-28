import Styling from '../styles/adverts.module.css';
import Head from 'next/head';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Select from '../components/select';
import Spoiler from '../components/spoiler';
import Meta from '../components/meta';

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
        <Meta />
        <NavigationBar />
        
        <main>
          <SearchBar prevSearch={search} />
          <Select options={['Sarreguemines', 'Remelfing', 'Hambach', 'Zetting']} />
          <Spoiler text={search} />

          <div className={Styling.resultsContainer}>
            <div className={Styling.resultsMeta} style={{ display: (search != null) & (search != '') ? '' : 'none !important' }}>
              <div>Showing results for "{search}"</div>
              <div>{count} result(s)</div>
            </div>

            <div className={Styling.results}>
              {[...Array(count)].map((_) => (
                <AdvertCard key={uuidv4()} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
