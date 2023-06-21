import { url } from 'api'
import axios from 'axios'
import { Item } from 'components/client/NewApplication'

export async function fetchItems() {
  const query = url + 'items'
  const response = await axios.get(query)

  const items = response.data.items as Item[]

  if (items) {
    return items
  }

  throw new Error(response.data.message)
}
