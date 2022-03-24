import Styling from './styles/suggestionCard.module.css'
import { Advert } from '../../types'
import Link from 'next/link'

export default function SuggestionCard(advert: Advert) {
  return (
    <Link href={`/adverts/${advert.id}`}>
      <div key={advert.id} className={Styling.container}>
        <img className={Styling.image} src={advert.image} />
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
