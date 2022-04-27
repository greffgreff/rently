import axios from 'axios'
import { User } from '../types'

export async function fetchUserByProvider(provider: string, providerId: string, token: string): Promise<User> {
  const res = await axios.get(process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL + 'api/v2/users/' + provider + '/' + providerId, getHeaders(token))
  return res.data.content
}

export async function fetchUserById(id: string, token?: string): Promise<User> {
  const res = await axios.get(process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL + 'api/v2/users/' + id, getHeaders(token))
  return res.data.content
}

export async function postUser(user: User, token: string) {
  await axios.post(process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL + 'api/v2/users/', user, getHeaders(token))
}

export async function putUser(user: User, token: string) {
  await axios.put(process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL + 'api/v2/users/' + user.id, user, getHeaders(token))
}

export async function deleteUser(id: string, token: string) {
  await axios.delete(process.env.NEXT_PUBLIC_USER_SERVICE_BASE_URL + 'api/v2/users/' + id, getHeaders(token))
}

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }
}
