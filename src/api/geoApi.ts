import axios from 'axios'
import { ProperAddress } from '../types'

export async function getProperFromAddressTomTom(...addressString: string[]): Promise<ProperAddress> {
  const res = await axios.get(`https://api.tomtom.com/search/2/geocode/${addressString.join('%20')}.json?storeResult=false&view=Unified&key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`)
  const firstResult = res.data?.results[0]
  return {
    address: {
      street: firstResult.address.streetName,
      city: firstResult.address?.municipality ?? firstResult.address?.city ?? firstResult.address?.localName,
      zip: firstResult.address.postalCode,
      country: firstResult.address.country,
    },
    geocode: {
      lat: firstResult.position.lat,
      lng: firstResult.position.lon,
    },
    formatedAddress: firstResult.address.freeformAddress + ', ' + firstResult.address.country,
  }
}

export async function getProperFromGeoTomTom(lat: number, lon: number): Promise<ProperAddress> {
  const res = await axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`)
  const firstResult = res.data?.addresses[0]
  return {
    address: {
      street: firstResult.address.streetName,
      city: firstResult.address?.municipality ?? firstResult.address?.city ?? firstResult.address?.localName,
      zip: firstResult.address.postalCode,
      country: firstResult.address.country,
    },
    geocode: {
      lat: firstResult.position.lat,
      lng: firstResult.position.lon,
    },
    formatedAddress: firstResult.address.freeformAddress + ', ' + firstResult.address.country,
  }
}

export async function getTopsFromAddress(...addressString: string[]): Promise<string[]> {
  const res = await axios.get(`https://api.tomtom.com/search/2/geocode/${addressString.join('%20')}.json?storeResult=false&view=Unified&key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`)
  const results = res.data?.results
  const parseResults: string[] = []

  results.forEach((result) => {
    if (result.type === 'Street' || result.type === 'Cross Street') {
      parseResults.push(result.address.freeformAddress + ', ' + result.address.country)
    }
  })

  return parseResults
}
