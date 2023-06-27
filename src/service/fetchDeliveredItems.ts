import { url } from 'api'
import axios from 'axios'
import { AcceptanceItem } from 'data/types'

export async function fetchDeliveredItems() {
  const query = url + 'worker/items/delivered'
  const response = await axios.get(query)

  return response.data.items as AcceptanceItem[]
}
