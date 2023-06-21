import { Navigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { AuthPage } from 'components/AuthPage'
import { AuthProviderValue } from './AuthProvider'
import { CircularProgress } from '@mui/material'

export function ToLoginPage() {
  const { user, storageChecked } = useAuth() as AuthProviderValue

  if (!storageChecked) {
    return <CircularProgress />
  }

  if (user) {
    if (user.role === 'сотрудник') {
      return <Navigate to="/applications" />
    } else if (user.role === 'кладовщик') {
      return <Navigate to="/acceptance" />
    } else {
      return <Navigate to="/" />
    }
  } else {
    return <AuthPage />
  }
}
