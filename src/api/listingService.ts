import axios from 'axios'
import { Listing } from '../types'

export async function fetchListings(token?: string) {
  const res = await axios.get('http://localhost:8081/api/v1/', getHeaders(token))
  return res.data.data
}

export async function fetchListingById(id: string, token?: string): Promise<Listing> {
  const res = await axios.get('http://localhost:8081/api/v1/' + id, getHeaders(token))
  return res.data.data
}

export async function postListing(listing: Listing, token: string) {
  await axios.post('http://localhost:8081/api/v1/', listing, getHeaders(token))
}

export async function putListing() {}

export async function deleteListing() {}

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }
}
