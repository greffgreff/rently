import Styling from './styles/marquee.module.css';
import { SuggestionCard } from '../index';

export default function Marquee({ rows, items, seconds, reversed }) {
  return (
    <div className={Styling.suggestions}>
      {[...Array(rows)].map((_, index) => (
        <div className={Styling.marqueeContainer}>
          {[...Array(2)].map((_) => (
            <div className={Styling.marquee} style={{ animationDirection: index % 2 == (reversed ? 1 : 0) ? 'reverse' : 'normal', animationDuration: `${seconds}s` }}>
              {[...Array(items)].map((_) => (
                <SuggestionCard />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
