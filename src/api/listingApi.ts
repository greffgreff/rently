import axios from 'axios'
import { Listing } from '../types'

export async function fetchListings() {}

export async function fetchListingById() {}

export async function postListing(listing: Listing) {
  //   axios.post('https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert', listing, {
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  console.log(listing)
}

export async function putListing() {}

export async function deleteListing() {}
