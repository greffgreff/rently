import Link from "next/link";
import Styling from "../styles/navigationBar.module.css";
import Button from "./button";
import ButtonLink from "./buttonLink";
import ButtonSecondary from "./buttonSecondary";
import Logo from "./logoAlt";

export default function NavigationBar() {
  return (
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
          <Button icon = { "fa fa-search" } text = { "Search" } />
          <ButtonSecondary icon = { "fa fa-search" } text = { "Search" } />
          <ButtonLink icon = { "fa fa-search" } text = { "Search" } />
        </div>
      </div>
    </div>
  );
}
