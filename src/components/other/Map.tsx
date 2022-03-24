import React from 'react'
import Styling from './styles/map.module.css'
import { LoadScript, GoogleMap } from '@react-google-maps/api'

export default function Map({ lat, lon }: { lat: number; lon: number }) {
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
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
      </LoadScript>
    </div>
  )
}
