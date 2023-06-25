import { url } from 'api'
import axios from 'axios'
import { Request } from 'components/client/Applications'

export async function fetchRequests(id_user: number) {
  const query = url + 'requests-by-user'
  const response = await axios.get(query, { params: { id_user } })

  const Requests = response.data.requests as Request[]

  if (Requests) {
    return Requests
  }

  throw new Error(response.data.message)
}