import Head from "next/head";
import Styling from "../styles/button.module.css";

export default function ButtonLink({ icon, text }) {
  return (
    <>
    <Head>
      <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet"/>
    </Head>
    <button type="button" className={`${Styling.btn} ${Styling.link}`}>  
      <i className={`${icon} ${Styling.icon}`} style={ { display: icon == null | icon == "" ? "none" : "" } } />
      {text}
    </button>
  </>
  );
}
