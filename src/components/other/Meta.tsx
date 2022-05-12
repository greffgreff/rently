import { useEffect, useState } from 'react'
import { fetchAddressByGeoTomTom } from '../../api'
import { ProperAddress } from '../../types'
import Styling from './styles/meta.module.css'

export default function Meta() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const current = new Date()
  const date = `${months[current.getMonth()]} ${current.getDate()}`
  const [locale, setLocale] = useState(null)
  const [language, setLanguage] = useState(null)

  useEffect(() => {
    if (typeof window.navigator !== 'undefined') {
      navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
        try {
          fetchAddressByGeoTomTom(pos.coords.latitude, pos.coords.longitude).then((address: ProperAddress) => setLocale(address?.address?.city))
        } catch (_) {}
      })
      setLanguage(navigator.languages[1].toUpperCase())
    }
  }, [])

  return (
    <div className={Styling.container}>
      <div className={Styling.left}>
        <div className={Styling.locale}>
          <i className="fa fa-location-arrow" />
          {locale ?? 'Worldwide'}
        </div>
        <div>{date}</div>
      </div>
      <div className={Styling.locale}>
        <i className="fa fa-globe" />
        {language ?? <b>EN</b>}
      </div>
    </div>
  )
}
