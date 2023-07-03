import { url } from 'api'
import axios from 'axios'

export async function addNewItemType(name: string) {
  const query = url + 'worker/items/types/new'

  const response = await axios.post(query, {
    params: { item: { name } }
  })

  return response.data.message
}
