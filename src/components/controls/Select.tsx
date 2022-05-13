import Styling from './styles/select.module.css'
import { v4 as uuid } from 'uuid'
import { useEffect, useRef } from 'react'

export default function Select({ options, onSelect, prevValue }: { options: any[]; onSelect?: any , prevValue?: string }) {
  const select = useRef(null)

  useEffect(() => handleSelect(), [])

  const handleSelect = () => {
    if (onSelect) {
      onSelect(select.current?.value)
    }
  }

  return (
    <select defaultValue={prevValue} ref={select} className={`${Styling.input} ${Styling.primary}`} onChange={handleSelect}>
      {options.map((t) => {
        return <option key={uuid()}>{t}</option>
      })}
    </select>
  )
}
