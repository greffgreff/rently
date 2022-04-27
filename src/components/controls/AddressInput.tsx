import { useRef, useState } from 'react'
import { fetchTopsFromAddress } from '../../api'
import Styling from './styles/input.module.css'

export default function InputAddress() {
  const [addresses, setAddresses] = useState<string[]>([])
  const input = useRef(null)

  const searchAddress = () => {
    // if (input.current.value) {
    //   fetchTopsFromAddress(input.current.value).then(setAddresses)
    // }
  }

  return (
    <div className={Styling.withSuggestions}>
      <input ref={input} className={Styling.input} placeholder={"Enter an address..."} onKeyUp={searchAddress} />
      <div>
        {addresses &&
          addresses.map((address) => {
            return <p>{address}</p>
          })}
      </div>
    </div>
  )
}
