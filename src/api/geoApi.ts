import axios from 'axios'
import { ProperAddress } from '../types'

const GOOGLE = 'AIzaSyCYm4sjNy3lfgfcfK7zV7e_G8sOVyHtpr0'

export async function getProperFromAddressGoogle(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString.join('+')}&key=${process.env.GOOGLE_API_KEY ?? GOOGLE}`)
  if (res.data.results.length) {
    return {
      geocode: res.data.results[0].geometry.location,
      formatedAddress: res.data.results[0].formatted_address,
    }
  }
  return null
}

const TOMTOM = 'r6SBW2lsmjrN88T2GgG7ddAwmtmJiwiC'

export async function getProperFromAddressTomTom(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://api.tomtom.com/search/2/geocode/${addressString.join('%20')}.json?storeResult=false&view=Unified&key=${process.env.TOMTOM_API_KEY ?? TOMTOM}`)
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

// https://developer.tomtom.com/search-api/api-explorer/
