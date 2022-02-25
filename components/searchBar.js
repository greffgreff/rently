import Link from 'next/link';
import Styling from '../styles/searchBar.module.css';

export default function SearchBar({ pixelWidth, percentageWidth }) {
  // const input = document.getElementById("searchInput")

  const handleClick = () => {
    console.log(document.getElementById("searchInput").value)
    // input = document.getElementById("searchInput").value
  }

  return (
    <div className={Styling.searchBar} style={{ width: percentageWidth == null ? `${pixelWidth}px` : pixelWidth == null ? `${percentageWidth}%` : 'auto' }}>
      {/* <Link href={`/adverts?search=${input}`}> */}
        <div className={Styling.searchBtn} onClick={handleClick}>
          <div className={Styling.btnText}>Search</div>
        </div>
      {/* </Link> */}
      <input id='searchInput' className={Styling.input} placeholder="Barbeque..." />
    </div>
  );
}
