import Styling from '../styles/searchBar.module.css';
import Button from './button';

export default function SearchBar() {
  return (
    <div className={Styling.searchBar}>
      <Button text={'Search'} icon={'fa fa-search'} />
      <input placeholder="Barbeque..." />
    </div>
  );
}
