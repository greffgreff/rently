import Styling from './styles/spoiler.module.css'
import Link from 'next/link'

export default function Spoiler({ search } : { search : string | string[] | undefined }) {
  var suggestions;
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
        {suggestions.map((s) => (
          <div className={Styling.suggestionLink}>
            <Link href={`/adverts?search=${s}`}>{s}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
