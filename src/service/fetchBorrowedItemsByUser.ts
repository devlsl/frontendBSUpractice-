import { url } from 'api'
import axios from 'axios'
import { Item } from 'components/client/BorrowedItemsByUser'
//import { AuthorizedUser } from 'data/types'

export async function fetchBorrowedItemsByUser(id_user: number) {
  const query = url + 'borrowed-items-by-user'
  const response = await axios.get(query, { params: { id_user } })

  const Items = response.data.items as Item[]

  if (Items) {
    return Items
  }

  throw new Error(response.data.message)
}