import { url } from 'api'
import axios from 'axios'
import { Request } from 'components/worker/Delivery'

export async function fetchAllRequests() {
  const query = url + 'all-requests'
  const response = await axios.get(query)

  const Requests = response.data.requests as Request[]

  if (Requests) {
    return Requests
  }

  throw new Error(response.data.message)
}