import Styling from './styles/marquee.module.css'
import { SuggestionCard } from '../index'
import { v4 as uuidv4 } from 'uuid'
import { Listing } from '../../types';

export default function Marquee({ listings, seconds, reversed }: { listings: Listing[]; seconds: number; reversed?: boolean }) {
  let count = 1
  if (listings.length < 10) {
    count = 5
  }

  return (
    <div className={Styling.suggestions}>
      <div key={uuidv4()} className={Styling.marqueeContainer}>
        {[...Array(count)].map((_) => (
          <div key={uuidv4()} className={Styling.marquee} style={{ animationDirection: reversed ? 'reverse' : 'normal', animationDuration: `${seconds}s` }}>
            {listings.map(advert => (
              <SuggestionCard key={uuidv4()} {...advert} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
