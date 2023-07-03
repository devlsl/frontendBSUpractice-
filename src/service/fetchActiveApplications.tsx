import { url } from 'api'
import axios from 'axios'
import { ActiveApplication } from 'data/types'

export async function fetchActiveApplications() {
  const query = url + 'worker/applications/active'
  const response = await axios.get(query)

  return response.data.items as ActiveApplication[]
}
