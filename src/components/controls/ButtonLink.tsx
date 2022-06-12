import Styling from './styles/button.module.css'

export default function ButtonLink({ text, icon, route, width, id }: { text: string; icon?: string; route?: string; width?: string; id?: string }) {
  return (
    <a href={route}>
      <button id={id} type="button" className={`${Styling.btn} ${Styling.link}`} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: !icon ? 'none' : '' }} />
        {text}
      </button>
    </a>
  )
}
