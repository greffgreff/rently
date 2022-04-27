import { useRef, useState } from 'react'
import Select from '../controls/Select'
import SearchBarAlt from './SearchBarAlt'
import Styling from './styles/refinedSearchBar.module.css'
import Router from 'next/router'

export default function RefinedSearchBar({ search }: { search: string | string[] }) {
  const [range, setRange] = useState<string>(null)
  const address = useRef(null)

  const makeSearch = (search: string) => {
    Router.push('/listings?search=' + search + '&address=' + address?.current?.value + '&range=' + range?.slice(0, -3))
  }

  return (
    <div className={Styling.refinedInputs}>
      <SearchBarAlt onClick={makeSearch} prevSearch={search} dynamic={false} />

      <div>
        <input type="checkbox" id="extraOptions" className={Styling.extraInputsInput} />
        <label htmlFor="extraOptions">
          <i className={`fas fa-angle-right ${Styling.arrow}`} />
        </label>

        <div className={Styling.extraInputsContent}>
          <input ref={address} className={Styling.addressInput} placeholder={'Enter an address...'} />
          <Select onSelect={setRange} options={['1 km', '2 km', '5 km', '10 km', '15 km', '20 km', '30 km', '40 km', '50 km', '75 km', '100 km']} />
        </div>
      </div>

      {/* {search ? <Spoiler search={search.toString()} /> : null} */}
    </div>
  )
}
