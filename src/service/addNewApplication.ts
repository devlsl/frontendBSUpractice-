import { url } from 'api'
import axios from 'axios'
import { AuthorizedUser } from 'data/types'

export async function addNewApplication(user: AuthorizedUser, items: number[]) {
  const query = url + 'user'
  const response = await axios.post(query, { params: { user, items } })

  return response.data

  if (user) {
    return { checkedUser: user, successMessage: response.data.message } as {
      checkedUser: AuthorizedUser
      successMessage: string
    }
  }

  throw new Error(response.data.message)
}
