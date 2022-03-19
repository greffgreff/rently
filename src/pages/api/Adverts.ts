import axios from 'axios'
import { Advert } from '../../types'

export default async function fetchAdverts(): Promise<Advert[]> {
  return await axios
    .get('https://6219106881d4074e85a0b85e.mockapi.io/api/v1/advert')
    .then((res) => res.data)
    .catch(console.log)
}
