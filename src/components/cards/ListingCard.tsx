import Styling from './styles/listingCard.module.css'
import Link from 'next/link'
import { Listing } from '../../types'

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`} passHref>
      <div className={Styling.container}>
        <div className={Styling.imageContainer}>
          <img className={Styling.image} src={listing.image} />
        </div>
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>{listing.price}€/day</div>
            <div className={Styling.title}>{listing.name}</div>
            <div className={Styling.date}>{listing.createdAt}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
