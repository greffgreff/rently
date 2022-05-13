import Styling from './styles/searchBar.module.css'
import { useRef } from 'react'

export default function SearchBarAlt({ prevSearch = '', dynamic = false, onClick }: { prevSearch?: string | string[]; dynamic?: boolean; onClick?: any }) {
  const input = useRef(null)

  const handleOnClick = () => {
    if (onClick) {
      onClick(input.current?.value)
    }
  }

  return (
    <div className={`${Styling.searchBar} ${Styling.searchBarAlt}`}>
      <div className={Styling.searchBtn} onClick={handleOnClick}>
        <div className={Styling.btnText}>Search</div>
      </div>

      <input ref={input} className={Styling.input} defaultValue={prevSearch} placeholder="Rent anything at any price..." onKeyUp={dynamic ? handleOnClick : null} />

      {/* <input type="checkbox" /> */}
    </div>
  )
}
