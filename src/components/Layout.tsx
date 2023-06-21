import { Container } from '@mui/material'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { LayoutWrapper } from './LayoutWrapper'

export const Layout = () => {
  const { user } = useAuth() as AuthProviderValue

  return (
    <>
      {user && <Header />}
      <Container>
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
      </Container>
    </>
  )
}
