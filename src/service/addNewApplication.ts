import { url } from 'api'
import axios from 'axios'
import { AuthorizedUser } from 'data/types'

export async function addNewApplication(user: AuthorizedUser, items: number[]) {
  const query = url + 'client'
  await axios.post(query, { params: { user, items } })
}
