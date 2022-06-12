import { MouseEvent } from 'react'
import Styling from './styles/button.module.css'

export default function ButtonLink({ text, icon, route, width, onClick, id }: { text: string; icon?: string; route?: string; width?: string; onClick?: any; id?: string }) {
  const handleOnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (onClick) {
      onClick(event)
    }
  }
  return (
    <a href={route}>
      <button id={id} type="button" className={`${Styling.btn} ${Styling.link}`} onClick={(event) => handleOnClick(event)} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: !icon ? 'none' : '' }} />
        {text}
      </button>
    </a>
  )
}
