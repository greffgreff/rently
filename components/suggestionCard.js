import Styling from '../styles/suggestionCard.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function SuggestionCard({ isNew }) {
  console.log(uuidv4());
  return (
    <div className={Styling.container} style={{ background: (isNew == null) | (isNew == '') ? 'white' : 'blue' }}>
      <img className={Styling.image} href="https://m.media-amazon.com/images/I/51N7lVhjuyL._AC_SX425_.jpg" />
      <div className={Styling.meta}>
        <div className={Styling.title}>DeWalt Generator 7000W</div>
        <div className={Styling.price}>10€/day</div>
      </div>
    </div>
  );
}
