import Styling from './styles/select.module.css'
import { v4 as uuid } from 'uuid'

export default function Select( options: string[] ) {
  return (
    <select className={`${Styling.input} ${Styling.primary}`}>
      {options.map((t) => {
        return <option key={uuid()}>{t}</option>
      })}
    </select>
  )
}
