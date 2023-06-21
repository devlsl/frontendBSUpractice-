import { Button, Stack } from '@mui/material'
import { Path } from 'data/types'
import { Link, useLocation } from 'react-router-dom'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'

export const WorkerOptionsBar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Stack spacing={2} direction="row">
      <Button
        color={currentPath === Path.Acceptance ? 'warning' : 'inherit'}
        component={Link}
        to={Path.Acceptance}
        sx={{ textTransform: 'none' }}
        startIcon={<DownloadIcon />}
        size="large"
      >
        Приём
      </Button>
      <Button
        color={currentPath === Path.Delivery ? 'warning' : 'inherit'}
        component={Link}
        to={Path.Delivery}
        size="large"
        sx={{ textTransform: 'none' }}
        startIcon={<UploadIcon />}
      >
        Выдача
      </Button>
    </Stack>
  )
}
