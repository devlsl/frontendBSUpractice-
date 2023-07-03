import { url } from 'api'
import axios from 'axios'
import { LogItem } from 'data/types'

export async function fetchItemsLog() {
  const query = url + 'worker/items/log'
  const response = await axios.get(query)

  const items = response.data.items

  if (items) {
    return items as LogItem[]
  }

  throw new Error(response.data.message)
}
