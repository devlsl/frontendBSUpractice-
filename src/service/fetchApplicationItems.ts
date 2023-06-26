import { url } from 'api'
import axios from 'axios'
import { ApplicationItem, AuthorizedUser } from 'data/types'

export async function fetchApplicationItems(user: AuthorizedUser) {
  const query = url + 'client/applications/all'
  const response = await axios.get(query, { params: { user } })

  return response.data.items as ApplicationItem[]
}
