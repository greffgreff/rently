import Styling from './styles/advertCard.module.css'
import Link from 'next/link'
import HoverStyle from '../../pages/styles/hoverable.module.css'
import { Advert } from '../../types'

export default function AdvertCard({ advert }: { advert: Advert }) {
  return (
    <Link href={`/adverts/${advert.id}`}>
      <div className={`${Styling.container} ${HoverStyle.container}`}>
        <div className={Styling.imageContainer}>
          <img className={Styling.image} src={advert.image} />
        </div>
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>{advert.price}€/day</div>
            <div className={Styling.title}>{advert.name}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
