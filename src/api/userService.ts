import axios from 'axios'
import { User } from '../types'

export async function fetchUser(provider: string, providerId: string): Promise<User> {
  return await axios
    .get('http://localhost:8080/api/v2/' + provider + '/' + providerId)
    .then((res) => res.data)
    .catch(console.log)
}

// export async function postUser(user : ProviderUser): Promise<>
