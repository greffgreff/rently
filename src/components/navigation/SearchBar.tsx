import Styling from './styles/searchBar.module.css'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export default function SearchBar({ prevSearch, width }: { prevSearch?: string | string[]; width?: string }) {
  const router = useRouter()
  const input = useRef(null)

  const makeSearch = () => {
    router.push('/listings' + input.current.value != '' ? '?search=' + input.current.value : '')
  }

  return (
    <div className={Styling.searchBar} style={{ width: width ?? 'auto' }}>
      <div className={Styling.searchBtn} onClick={makeSearch}>
        <div className={Styling.btnText}>Search</div>
      </div>
      <input ref={input} className={Styling.input} defaultValue={prevSearch ?? ''} placeholder="Rent anything at any price..." onKeyUp={makeSearch} />
    </div>
  )
}
