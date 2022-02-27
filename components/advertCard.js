import Link from 'next/link';
import Styling from '../styles/advertCard.module.css';
import HoverStyle from '../styles/hoverable.module.css';

export default function AdvertCard() {
  return (
    <Link href="/">
      <div className={`${Styling.container} ${HoverStyle.container}`}>
        <div className={Styling.imageContainer}>
          {/* <img className={Styling.image} src="https://img.leboncoin.fr/api/v1/lbcpb1/images/39/da/c9/39dac95eade62e4b0a28764429f4316eb42eefde.jpg?rule=ad-large" /> */}
        </div>
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>10€/day</div>
            <div className={Styling.title}>DeWalt Generator 7000W</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
