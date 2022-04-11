import axios from 'axios'
import { Listing } from '../types'

export async function fetchListings() {
  const res = await axios.get(process.env.NEXT_PUBLIC_LISTING_SERVICE_BASE_URL + 'api/v1/')
  return res.data.content
}

export async function fetchListingById(id: string): Promise<Listing> {
  const res = await axios.get(process.env.NEXT_PUBLIC_LISTING_SERVICE_BASE_URL + 'api/v1/' + id)
  return res.data.content
}

export async function postListing(listing: Listing, token: string) {
  console.log(listing)
  await axios.post(process.env.NEXT_PUBLIC_LISTING_SERVICE_BASE_URL + 'api/v1/', listing, getHeaders(token))
}

export async function putListing(listing: Listing, token: string) {
  await axios.put(process.env.NEXT_PUBLIC_LISTING_SERVICE_BASE_URL + 'api/v1/' + listing.id, listing, getHeaders(token))
}

export async function deleteListing(id: string, token: string) {
  await axios.delete(process.env.NEXT_PUBLIC_LISTING_SERVICE_BASE_URL + 'api/v1/' + id, getHeaders(token))
}

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }
}
