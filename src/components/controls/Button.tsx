import { HTMLAttributes, MouseEvent } from 'react'
import Styling from './styles/button.module.css'

export default function Button({ text, icon, route, width, submit, onClick }: { text: string; icon?: string; route?: string; width?: string; submit?: boolean; onClick?: any }) {
  const handleOnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <a href={route}>
      <button type={submit ? 'submit' : 'button'} onClick={(event) => handleOnClick(event)} className={`${Styling.btn} ${Styling.primary}`} style={{ width: width ?? 'auto' }}>
        <i className={`${icon} ${Styling.icon}`} style={{ display: !icon ? 'none' : '' }} />
        {text}
      </button>
    </a>
  )
}
