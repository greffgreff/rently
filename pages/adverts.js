import Head from 'next/head';
import Styling from '../styles/adverts.module.css';
import AdvertCard from '../components/advertCard.js';
import NavigationBar from '../components/navigationBar';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Input from '../components/input';
import Link from 'next/link';

export default function Adverts() {
  const router = useRouter();
  const { search } = router.query;
  const { results } = router.query;
  const count = isNaN(parseInt(results)) ? 10 : parseInt(results);

  const suggestions = ['rx 6800', 'rx 6800 xt', 'rtx 3080', 'rtx 3090', 'rx 6900 xt'];

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
          <Input options={['Sarreguemines', 'Remelfing', 'Hambach', 'Zetting']} />

          <div className={Styling.resultsMeta} style={{ display: (search != null) & (search != '') ? '' : 'none !important' }}>
            <p>Showing results for "{search}"</p>
            <p>{count} result(s)</p>
          </div>

          <div className={Styling.spoiler}>
            <input type="checkbox" id="spoiler_" className={Styling.spoilerInput} />
            <label for="spoiler_">
              <i className={`fas fa-angle-right ${Styling.arrow}`} />
            </label>

            <div className={Styling.spoilerContent}>
              {suggestions.map((s) => (
                <div className={Styling.suggestionLink}>
                  <Link href={`/adverts?search=${s}`}>{s}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className={Styling.results}>
            {[...Array(count)].map((_) => (
              <AdvertCard key={uuidv4()} />
            ))}
          </div>

          {suggestions.map((s) => (
            <div className={Styling.suggestionLink}>
              <Link href={`/adverts?search=${search}`}>{s}</Link>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
