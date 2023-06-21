import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthProviderValue } from './AuthProvider'
import { AuthorizedUser, Role } from 'data/types'

interface CheckUserInStorageProps {
  children: JSX.Element
}

export function CheckUserInStorage({ children }: CheckUserInStorageProps) {
  const { user, setUser, setStorageChecked } = useAuth() as AuthProviderValue

  useEffect(() => {
    const id = window.localStorage.getItem('userId')
    const login = window.localStorage.getItem('userLogin')
    const password = window.localStorage.getItem('userPassword')
    const role = window.localStorage.getItem('userRole')

    if (id && login && password && role && !user) {
      setUser({
        id: +id,
        login,
        password,
        role: role as Role
      } as AuthorizedUser)
    }

    setStorageChecked(true)
  }, [user])

  return children
}
