import Styling from './styles/suggestionCard.module.css'
import { Listing } from '../../types'
import Link from 'next/link'

export default function SuggestionCard(listing: Listing) {
  return (
    <Link href={`/listings/${listing.id}`} passHref>
      <div key={listing.id} className={Styling.container}>
        <img className={Styling.image} src={listing.image} />
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>{listing.price}€/day</div>
            <div className={Styling.title}>{listing.name}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
