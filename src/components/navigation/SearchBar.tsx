import Styling from './styles/searchBar.module.css'
import Router from 'next/router'
import { useRef } from 'react'

export default function SearchBar({ prevSearch = '', width = 'auto', dynamic = false }: { prevSearch?: string | string[]; width?: string; dynamic?: boolean }) {
  const input = useRef(null)

  const makeSearch = () => {
    Router.push('/listings?search=' + input.current.value)
  }

  return (
    <div className={Styling.searchBar} style={{ width: width }}>
      <div className={Styling.searchBtn} onClick={makeSearch}>
        <div className={Styling.btnText}>Search</div>
      </div>

      <input ref={input} className={Styling.input} defaultValue={prevSearch} placeholder="Rent anything at any price..." onKeyUp={dynamic ? makeSearch : null} />
    </div>
  )
}
