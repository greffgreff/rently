import Styling from './styles/button.module.css'

export default function Button({text, icon, route, width, submit } : { text : string, icon? : string, route? : string, width?: string, submit? : boolean }) {
  return (
    <a href={route}>
      <button type={submit ? "submit" : "button"} className={`${Styling.btn} ${Styling.primary}`} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: !icon ? 'none' : '' }} />
        {text}
      </button>
    </a>
  )
}
