import Styling from './styles/input.module.css'

export default function Input( placeholder : string ) {
  return <input className={Styling.input} placeholder={placeholder} />
}
