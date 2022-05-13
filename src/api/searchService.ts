import axios from 'axios'
import { Listing, SearchResults } from '../types'

export async function aggregatedListingsSearch(query: string): Promise<SearchResults> {
  console.log(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/aggregatedSearch' + query)
  const res = await axios.get(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/aggregatedSearch' + query)
  return res.data
}

export async function getListingById(id: string): Promise<Listing> {
  console.log(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/id/' + id)
  const res = await axios.get(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/id/' + id)
  return res.data.results
}

export async function getRandomListings(count: number): Promise<Listing[]> {
  console.log(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/random' + (count ? '?count=' + count : null))
  const res = await axios.get(process.env.NEXT_PUBLIC_SEARCH_SERVICE_BASE_URL + 'api/v1/listings/random' + (count ? '?count=' + count : null))
  return res.data.results
}
