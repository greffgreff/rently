import axios from 'axios'
import { Listing } from '../types'

export async function fetchListings() {}

export async function fetchListingById() {}

export async function postListing(listing: Listing, token: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  axios.post('http://localhost:8080/api/v1/', listing, options).then(console.log).catch(console.log)
}

export async function putListing() {}

export async function deleteListing() {}
