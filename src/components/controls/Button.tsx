import { MouseEvent } from 'react'
import Styling from './styles/button.module.css'

export default function Button({ text, icon, route, width, submit, onClick, id }: { text: string; icon?: string; route?: string; width?: string; submit?: boolean; onClick?: any; id?: string }) {
  const handleOnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <a href={route}>
      <button id={id} type={submit ? 'submit' : 'button'} onClick={(event) => handleOnClick(event)} className={`${Styling.btn} ${Styling.primary}`} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: !icon ? 'none' : '' }} />
        {text}
      </button>
    </a>
  )
}
