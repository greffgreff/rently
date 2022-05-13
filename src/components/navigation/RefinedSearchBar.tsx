import { useRef, useState } from 'react'
import Select from '../controls/Select'
import SearchBarAlt from './SearchBarAlt'
import Styling from './styles/refinedSearchBar.module.css'
import Router from 'next/router'
import QueryBuilder from '../../utils/QueryBuilder'

export default function RefinedSearchBar({ prevSearch, prevAddress, prevRange }: { prevSearch?: string | string[]; prevAddress?: string | string[]; prevRange?: string | string[] }) {
  const [range, setRange] = useState<string>()
  const [address, setAddress] = useState<string>()

  const makeSearch = (search?: string) => {
    const uri = QueryBuilder.of('/listings').addParam('search', search).addParam('address', address).addParam('range', range?.slice(0, -3))
    Router.push(uri.createURLencoded())
  }

  return (
    <div className={Styling.refinedInputs}>
      <SearchBarAlt onClick={makeSearch} prevSearch={prevSearch} dynamic={false} />

      <div>
        <input type="checkbox" id="extraOptions" className={Styling.extraInputsInput} />
        <label htmlFor="extraOptions">
          <i className={`fas fa-angle-right ${Styling.arrow}`} />
        </label>

        <div className={Styling.extraInputsContent}>
          <div className={Styling.extraInputsContentLayer}>
            <input defaultValue={prevAddress} onChange={(event) => setAddress(event.target.value)} className={Styling.addressInput} placeholder={'Enter an address...'} />
            <Select prevValue={prevRange?.toString()} onSelect={setRange} options={['1 km', '2 km', '5 km', '10 km', '15 km', '20 km', '30 km', '40 km', '50 km', '75 km', '100 km', '200 km']} />
          </div>
        </div>
      </div>

      {/* {search ? <Spoiler search={search.toString()} /> : null} */}
    </div>
  )
}
