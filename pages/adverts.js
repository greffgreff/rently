import Head from "next/head";
import styling from "../styles/adverts.module.css";
import AdvertCard from "../components/advertCard.js";

export default function Adverts() {
  return (
    <>
      <Head>
        <title>Adverts</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styling.container}>
        <div className={styling.adverts}>
          <AdvertCard urgent={true} />
          <AdvertCard urgent={true} />
          <AdvertCard urgent={true} />
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
    </>
  );
}
