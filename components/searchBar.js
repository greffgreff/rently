import Styling from '../styles/searchBar.module.css';
import Button from './button';

export default function SearchBar({ pixelWidth, percentageWidth }) {
  return (
    <div className={Styling.searchBar} style={{ width: percentageWidth == null ? `${pixelWidth}px` : pixelWidth == null ? `${percentageWidth}%` : 'auto' }}>
      <div className={Styling.searchBtn}>
        <div className={Styling.btnText}>
          {/* <i className={`fa fa-search ${Styling.icon}`} /> */}
          Search
        </div>
      </div>
      <input className={Styling.input} placeholder="Barbeque..." />
    </div>
  );
}
