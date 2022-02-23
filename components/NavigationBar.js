import Head from "next/head";
import Link from "next/link";
import Styling from "../styles/navigationBar.module.css";
import Logo from "./logoAlt";

export default function NavigationBar() {
  return (
    <>
      <Head>
        <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />
      </Head>

      <div className={Styling.container}>
        <div className={Styling.content}>
          <div className={Styling.navItemsContainer}>
            <Logo />
            <button className={Styling.navBtn}><i className="fa fa-plus" /><e>Lease something</e></button>
            <Link href="/adverts">
              <button className={`${Styling.navBtn} ${Styling.searchBtn}`}><i className="fa fa-search" /><t>Search</t></button>
            </Link>
          </div>
          <div className={Styling.navItemsContainer}>
            <button className={`${Styling.navBtn} ${Styling.loginBtn}`}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
