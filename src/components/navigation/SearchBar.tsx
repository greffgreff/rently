import Styling from './styles/searchBar.module.css'
import { useRouter } from 'next/router'

export default function SearchBar({ prevSearch, width }: { prevSearch?: string | string[]; width?: string }) {
  const router = useRouter()

  const handleClick = () => {
    const search = (document.getElementById('searchInput')! as HTMLInputElement).value
    router.push(`/listings${search != '' ? `?search=${search}` : ''}`)
  }

  return (
    <div className={Styling.searchBar} style={{ width: width ?? 'auto' }}>
      <div className={Styling.searchBtn} onClick={handleClick}>
        <div className={Styling.btnText}>Search</div>
      </div>
      <input id="searchInput" className={Styling.input} placeholder={prevSearch?.toString() ?? 'Find anything at any price...'} />
    </div>
  )
}
