import Styling from '../styles/searchBar.module.css';
import Button from './button';

export default function SearchBar({ pixelWidth, percentageWidth }) {
  return (
    <div className={Styling.searchBar} style={{ width: percentageWidth == null ? `${pixelWidth}px` : pixelWidth == null ? `${percentageWidth}%` : 'auto' }}>
      <Button text={'Search'} icon={'fa fa-search'} />
      <input placeholder="Barbeque..." />
    </div>
  );
}
