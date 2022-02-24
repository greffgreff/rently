import Styling from '../styles/suggestionCard.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function SuggestionCard() {
  return (
    <div key={uuidv4()} className={Styling.container}>
      <img className={Styling.image} src="https://img.leboncoin.fr/api/v1/lbcpb1/images/39/da/c9/39dac95eade62e4b0a28764429f4316eb42eefde.jpg?rule=ad-large" />
      <div className={Styling.meta}>
        <div className={Styling.innerMeta}>
          <div className={Styling.price}>10€/day</div>
          <div className={Styling.title}>DeWalt Generator 7000W</div>
        </div>
      </div>
    </div>
  );
}
