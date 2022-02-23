import Head from 'next/head'
import NavigationBar from '../components/navigationBar'
import SuggestionCard from '../components/suggestionCard'
import Styling from '../styles/index.module.css'

export default function Index() {
  return (
    <>
      <Head>
        <title>Rently</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div>
        <NavigationBar />
        <main className={Styling.index}>
          <div className={Styling.explore}>
            <div className={Styling.search} />
            <div className={Styling.suggestions}>
              <div className={`${Styling.marquee}`}>
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
              </div>
              <div className={Styling.marquee}>
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
              </div>
              <div className={Styling.marquee}>
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
