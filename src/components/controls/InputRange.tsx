import Styling from './styles/input.module.css'

export default function InputRange() {
  return <input type="range" className={`${Styling.input} ${Styling.rangeInput}`} />
}
