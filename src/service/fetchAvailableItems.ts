import { url } from 'api'
import axios from 'axios'
import { CertainItem } from 'data/types'

export async function fetchAvailableItems() {
  const query = url + 'worker/items/available'
  const response = await axios.get(query)

  return response.data.items as CertainItem[]
}
