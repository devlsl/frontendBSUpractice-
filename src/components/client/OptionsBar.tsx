import { Button, Stack } from '@mui/material'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Link, useLocation } from 'react-router-dom'
import { Path } from 'data/types'

export const ClientOptionsBar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Stack spacing={2} direction="row">
      <Button
        color={currentPath === Path.Applications ? 'warning' : 'inherit'}
        component={Link}
        to={Path.Applications}
        sx={{ textTransform: 'none' }}
        startIcon={<AutoAwesomeMotionIcon />}
        size="large"
      >
        Мои заявки
      </Button>
      <Button
        color={currentPath === Path.NewApplication ? 'warning' : 'inherit'}
        component={Link}
        to={Path.NewApplication}
        size="large"
        sx={{ textTransform: 'none' }}
        startIcon={<NoteAddIcon />}
      >
        Новая заявка
      </Button>
      <Button
        color={currentPath === Path.BorrowedItemsByUser ? 'warning' : 'inherit'}
        component={Link}
        to={Path.BorrowedItemsByUser}
        size="large"
        sx={{ textTransform: 'none' }}
        startIcon={<AutoAwesomeMotionIcon />}
      >
        Взятое оборудование
      </Button>
    </Stack>
  )
}
