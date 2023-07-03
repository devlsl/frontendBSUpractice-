import { url } from 'api'
import axios from 'axios'

export async function addNewItem(itemTypeId: number) {
  const query = url + 'worker/items/new'

  await axios.post(query, {
    params: { item: { itemTypeId } }
  })
}
