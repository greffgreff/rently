import axios from 'axios'
import { Listing } from '../types'

export async function fetchListings() {}

export async function fetchListingById() {}

export async function postListing(listing: Listing, token: string) {
  console.log(listing)

  axios
    .post('http://localhost:8080/api/v1/', listing, getHeaders(token))
    .then((res) => console.log(res.data))
    .catch(console.log)
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
