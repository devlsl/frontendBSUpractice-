import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { AuthProviderValue } from './AuthProvider'
import { Role } from 'data/types'

interface RequireAuthProps {
  children: JSX.Element
  role: Role
}

export const RequireRole = ({ children, role }: RequireAuthProps) => {
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'

  const { user } = useAuth() as AuthProviderValue

  return user?.role === role ? children : <Navigate to={fromPage} />
}
