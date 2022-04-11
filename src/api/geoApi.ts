import axios from 'axios'
import { ProperAddress } from '../types'

export async function getProperFromAddressGoogle(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString.join('+')}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
  if (res.data.results.length) {
    return {
      geocode: res.data.results[0].geometry.location,
      formatedAddress: res.data.results[0].formatted_address,
    }
  }
  return null
}

export async function getProperFromAddressTomTom(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://api.tomtom.com/search/2/geocode/${addressString.join('%20')}.json?storeResult=false&view=Unified&key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`)
  if (res.data.results.length) {
    return {
      geocode: {
        lat: res.data.results[0].position.lat,
        lng: res.data.results[0].position.lon,
      },
      formatedAddress: res.data.results[0].address.freeformAddress + ', ' + res.data.results[0].address.country,
    }
  }
  return null
}
