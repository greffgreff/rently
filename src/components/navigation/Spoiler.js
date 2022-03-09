import Styling from './styles/spoiler.module.css'
import Link from 'next/link'

export default function Spoiler({ text }) {
  const suggestions = [text ?? '', 'rx 6800', 'rx 6800 xt', 'rtx 3080', 'rtx 3090', 'rx 6900 xt']

  return (
    <div className={Styling.spoiler}>
      <input type="checkbox" id="spoiler_" className={Styling.spoilerInput} />
      <label for="spoiler_">
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
