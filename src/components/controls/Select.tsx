import Styling from './styles/select.module.css'
import { v4 as uuid } from 'uuid'
import { useEffect, useRef, useState } from 'react'

export default function Select({ options, onSelect, prevValue }: { options: any[]; onSelect?: any; prevValue?: string }) {
  const select = useRef(null)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    handleSelect()
    setSelected(prevValue ?? options[0])
  }, [])

  const handleSelect = () => {
    if (onSelect) {
      onSelect(select.current?.value)
    }
  }

  return (
    <select
      ref={select}
      value={selected}
      className={`${Styling.input} ${Styling.primary}`}
      onChange={(event) => {
        setSelected(event.target.value)
        handleSelect()
      }}
    >
      {options.map((t) => {
        return <option key={uuid()}>{t}</option>
      })}
    </select>
  )
}
