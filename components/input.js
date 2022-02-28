import Styling from '../styles/input.module.css'

export default function Input({ placeholder }) {
  return (
    <input className={Styling.input} placeholder={placeholder} />
  )
}
