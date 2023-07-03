import { url } from 'api'
import axios from 'axios'
import { TypedItem } from 'data/types'

export async function fetchItemTypes() {
  const query = url + 'worker/items/types'
  const response = await axios.get(query)

  return response.data.items as TypedItem[]
}
