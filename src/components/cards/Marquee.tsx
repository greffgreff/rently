import Styling from './styles/marquee.module.css'
import { SuggestionCard } from '../index'
import { v4 as uuidv4 } from 'uuid'

export default function Marquee({ rows, items, seconds, reversed } : { rows : number, items : number, seconds : number, reversed?: boolean }) {
  return (
    <div className={Styling.suggestions}>
      {[...Array(rows)].map((_, index) => (
        <div key={uuidv4()} className={Styling.marqueeContainer}>
          {[...Array(2)].map((_) => (
            <div key={uuidv4()} className={Styling.marquee} style={{ animationDirection: index % 2 == (reversed ? 1 : 0) ? 'reverse' : 'normal', animationDuration: `${seconds}s` }}>
              {[...Array(items)].map((_) => (
                <SuggestionCard key={uuidv4()} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
