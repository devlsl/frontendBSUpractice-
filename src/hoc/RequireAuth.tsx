import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { AuthProviderValue } from './AuthProvider'
import { CircularProgress } from '@mui/material'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation()

  const { user, storageChecked } = useAuth() as AuthProviderValue

  if (!storageChecked) {
    return <CircularProgress />
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} />
}
