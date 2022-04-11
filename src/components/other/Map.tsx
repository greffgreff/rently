import Styling from './styles/map.module.css'
import { LoadScript, GoogleMap } from '@react-google-maps/api'

export default function Map({ lat, lon, options }: { lat: number; lon: number, options?: object }) {
  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const center = {
    lat: parseFloat(lat.toString()), 
    lng: parseFloat(lon.toString()),
  }

  return (
    <div className={Styling.mapArea}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap options={options} mapContainerStyle={containerStyle} center={center} zoom={15} />
      </LoadScript>
    </div>
  )
}
