import Head from "next/head";
import Styling from "../styles/adverts.module.css";
import AdvertCard from "../components/advertCard.js";
import NavigationBar from "../components/navigationBar";

export default function Adverts() {
  return (
    <>
      <Head>
        <title>Adverts</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main >
          <NavigationBar />
          <div className={Styling.container}>
            <div className={Styling.refineSearch} />
            <div className={Styling.adverts}>
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
          </div>
      </main>
    </>
  );
}
