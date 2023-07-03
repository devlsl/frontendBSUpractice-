import { url } from 'api'
import axios from 'axios'

export async function acceptItem(
  itemId: number,
  applicationId: number,
  clientLogin: string,
  comment: string
) {
  const query = url + 'worker/item/accept'

  await axios.post(query, {
    params: { item: { itemId, applicationId, clientLogin, comment } }
  })
}
