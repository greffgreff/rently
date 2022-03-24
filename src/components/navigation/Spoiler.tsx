import Styling from './styles/spoiler.module.css'
import Link from 'next/link'
import { ReactChild, ReactFragment, ReactPortal } from 'react';

export default function Spoiler({ search } : { search : string | string[] | undefined }) {
  let suggestions : string[];
  if (!Array.isArray(search)) {
    suggestions = [search ?? '', 'rx 6800', 'rx 6800 xt', 'rtx 3080', 'rtx 3090', 'rx 6900 xt']
  } else {
    suggestions = search;
  }

  return (
    <div className={Styling.spoiler}>
      <input type="checkbox" id="spoiler_" className={Styling.spoilerInput} />
      <label htmlFor="spoiler_">
        <i className={`fas fa-angle-right ${Styling.arrow}`} />
      </label>

      <div className={Styling.spoilerContent}>
        {suggestions.map((suggestion) => (
          <div key={suggestion} className={Styling.suggestionLink}>
            <Link href={`/adverts?search=${suggestion}`}>{suggestion}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
