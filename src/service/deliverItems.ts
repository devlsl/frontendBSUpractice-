import { url } from 'api'
import axios from 'axios'
import { DeliveringItem } from 'data/types'

export async function deliverItems(deliveringItems: DeliveringItem[]) {
  const query = url + 'worker/item/deliver'

  const response = await axios.post(query, {
    params: { items: deliveringItems }
  })

  return response.data.message
}
