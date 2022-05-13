import Styling from './styles/select.module.css'
import { v4 as uuid } from 'uuid'
import { useRef } from 'react'

export default function Select({ options, onSelect }: { options: any[]; onSelect?: any }) {
  const select = useRef(null)

  const handleSelect = () => {
    if (select.current.value && onSelect) {
      onSelect(select.current.value)
    }
  }

  return (
    <select ref={select} className={`${Styling.input} ${Styling.primary}`} onChange={handleSelect}>
      {options.map((t) => {
        return <option key={uuid()}>{t}</option>
      })}
    </select>
  )
}
