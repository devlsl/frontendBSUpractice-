import { url } from 'api'
import axios from 'axios'
import { Item } from 'components/worker/Acceptance'

export async function fetchAllBorrowedItems() {
  const query = url + 'all-borrowed-items'
  const response = await axios.get(query)

  const items = response.data.items as Item[]

  if (items) {
    return items
  }

  throw new Error(response.data.message)
}