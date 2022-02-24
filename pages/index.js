import Head from 'next/head';
import NavigationBar from '../components/navigationBar';
import SuggestionCard from '../components/suggestionCard';
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
        {/* <main className={Styling.index}> */}
          <div className={Styling.explore}>
            <div className={Styling.search} />
            <div className={Styling.suggestions}>
              {[...Array(3)].map((_) => (
                <div className={Styling.marqueeContainer}>
                  {[...Array(2)].map((_) => (
                    <div className={Styling.marquee}>
                      {[...Array(20)].map((_) => ( 
                        <SuggestionCard />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        {/* </main> */}
      </div>
    </>
  );
}
