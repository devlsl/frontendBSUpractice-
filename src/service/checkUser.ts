import { url } from 'api'
import axios from 'axios'
import { AuthData, AuthorizedUser } from 'data/types'

export async function checkUser(authData: AuthData) {
  const query = url + 'user'
  const response = await axios.get(query, { params: authData })

  const user = response.data.user

  if (user) {
    return { checkedUser: user, successMessage: response.data.message } as {
      checkedUser: AuthorizedUser
      successMessage: string
    }
  }

  throw new Error(response.data.message)
}
