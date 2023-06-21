import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { capitalize } from 'utils/capitalize'
import LogoutIcon from '@mui/icons-material/Logout'
import { WorkerOptionsBar } from './worker/OptionsBar'
import { ClientOptionsBar } from './client/OptionsBar'

export const Header = () => {
  const { signOut } = useAuth() as AuthProviderValue

  const { user } = useAuth() as AuthProviderValue

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ px: '15px' }} position="static">
        <Toolbar>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {capitalize(user?.role || '')}
            </Typography>
            <Typography
              sx={{ border: '1px solid white', borderRadius: '4px', px: '5px' }}
              variant="h6"
              component="div"
            >
              {capitalize(user?.login || '')}
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1, textDecoration: 'none' }}>
            {user?.role === 'кладовщик' ? (
              <WorkerOptionsBar />
            ) : (
              <ClientOptionsBar />
            )}
          </Box>

          <IconButton
            size="large"
            color="inherit"
            aria-label="log-out"
            onClick={() => signOut(() => {})}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
