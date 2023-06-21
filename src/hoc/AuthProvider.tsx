import { AuthData, AuthorizedUser } from 'data/types'
import { useState, createContext, PropsWithChildren } from 'react'
import { checkUser } from 'service/checkUser'

export interface AuthProviderValue {
  user: AuthorizedUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthorizedUser | null>>
  signIn: (authData: AuthData) => Promise<string>
  signOut: (cb: () => void) => void
  storageChecked: boolean
  setStorageChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthProviderValue | undefined>(
  undefined
)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthorizedUser | null>(null)

  const signIn = async (authData: AuthData) => {
    const { checkedUser, successMessage } = await checkUser(authData)
    setUser(checkedUser)
    window.localStorage.setItem('userId', checkedUser.id.toString())
    window.localStorage.setItem('userLogin', checkedUser.login.toString())
    window.localStorage.setItem('userPassword', checkedUser.password.toString())
    window.localStorage.setItem('userRole', checkedUser.role.toString())

    return successMessage
  }

  const signOut = (cb: () => void) => {
    setUser(null)
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('userLogin')
    window.localStorage.removeItem('userPassword')
    window.localStorage.removeItem('userRole')
    cb()
  }

  const [storageChecked, setStorageChecked] = useState<boolean>(false)

  const value = {
    user,
    setUser,
    signIn,
    signOut,
    storageChecked,
    setStorageChecked
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
