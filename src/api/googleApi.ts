import axios from 'axios'
import { ProperAddress } from '../types'

const KEY = 'AIzaSyCYm4sjNy3lfgfcfK7zV7e_G8sOVyHtpr0'

export async function getProperFromAddress(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString.join('+')}&key=${process.env.GOOGLE_MAP_KEY ?? KEY}`)
  if (res.data.results.length) {
    return {
      geocode: res.data.results[0].geometry.location,
      formaterAddress: res.data.results[0].formatted_address,
    }
  }
  return null
}
