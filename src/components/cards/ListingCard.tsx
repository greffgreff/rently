import Styling from './styles/listingCard.module.css'
import Link from 'next/link'
import { Listing } from '../../types'
import Image from 'next/image'

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`} passHref>
      <div className={Styling.container}>
        <div className={Styling.imageContainer}>
          <Image className={Styling.image} alt={listing?.name} src={listing.image ? listing.image : '/noimage.svg'} width={200} height={200} />
        </div>
        <div className={Styling.meta}>
          <div className={Styling.innerMeta}>
            <div className={Styling.price}>{listing.name}</div>
            <div className={Styling.title}>{listing.price}€/day</div>
            <div className={Styling.date}>{listing.createdAt}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
