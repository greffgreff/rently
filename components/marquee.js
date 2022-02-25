import SuggestionCard from '../components/suggestionCard';
import Styling from '../styles/marquee.module.css';

export default function Marquee({ rows, items, seconds }) {
  return (
    <div className={Styling.suggestions}>
      {[...Array(rows)].map((_, index) => (
        <div className={Styling.marqueeContainer}>
          {[...Array(2)].map((_) => (
            <div className={Styling.marquee} style={{ animationDirection: index % 2 == 0 ? 'reverse' : 'normal', animationDuration: `${seconds}s` }}>
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
