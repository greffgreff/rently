import axios from 'axios'
import { useEffect, useState } from 'react'
import { getTopSuggestions } from '../../api'
import Styling from './styles/spoiler.module.css'

type Suggestion = {
  word: string
  score: number
  tags: string[]
}

export default function Spoiler({ search }: { search: string }) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    getTopSuggestions(search).then((suggestions: Suggestion[]) => {
      suggestions.slice(0, 10).forEach((suggestion) => {
        setSuggestions((w) => [...w, suggestion.word])
      })
    })
  }, [])

  return (
    <div className={Styling.spoiler}>
      <input type="checkbox" id="spoiler_" className={Styling.spoilerInput} />
      <label htmlFor="spoiler_">
        <i className={`fas fa-angle-right ${Styling.arrow}`} />
      </label>

      <div className={Styling.spoilerContent}>
        {suggestions.map((suggestion) => (
          <div key={suggestion} className={Styling.suggestionLink}>
            <a href={`/listings?search=${suggestion}`}>{suggestion}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
