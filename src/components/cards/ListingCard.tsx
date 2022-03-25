import Styling from './styles/listingCard.module.css'
import Link from 'next/link'
import { Listing } from '../../types'
import moment from 'moment'

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className={Styling.container}>
        <div className={Styling.imageContainer}>
          <img className={Styling.image} src={listing.image} />
        </div>
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>{listing.price}€/day</div>
            <div className={Styling.title}>{listing.name}</div>
            <div className={Styling.date}>{moment.unix(listing.createAt).format('MM/DD/YYYY HH:mm:ss')}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
