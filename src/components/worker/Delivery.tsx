import { Box, Button, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { ActiveApplication } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { fetchActiveApplications } from 'service/fetchActiveApplications'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import DeliverItemModal from 'components/modals/DeliverItemModal'

export const Delivery = () => {
  const { user } = useAuth() as AuthProviderValue

  const [open, setOpen] = useState(false)
  const [row, setRow] = useState<ActiveApplication>()

  const columns: GridColDef[] = [
    {
      field: 'applicationId',
      headerName: 'Номер заявки',
      width: 130,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'login',
      headerName: 'Логин сотрудника',
      align: 'center',
      headerAlign: 'center',
      width: 160,
      renderCell: (params) => {
        return (
          <Typography variant="body2">{params.row.client.login}</Typography>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Выдача',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        const onClick = async (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.stopPropagation()
          setRow(params.row)
          setOpen(true)
        }

        return (
          <Button onClick={onClick}>
            <PublishedWithChangesIcon color="action" />
          </Button>
        )
      }
    }
  ]

  const [applications, setApplications] = useState<ActiveApplication[]>([])

  useEffect(() => {
    if (user) {
      fetchActiveApplications().then(setApplications)
    }
  }, [open])

  return (
    <Box sx={{ marginTop: '100px' }}>
      {open && row && (
        <DeliverItemModal open={open} setOpen={setOpen} row={row} />
      )}
      <Stack spacing={2}>
        {!!applications.length ? (
          <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={applications}
            columns={columns}
            getRowId={(row) => row.applicationId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
          />
        ) : (
          <Typography variant="h5" color="GrayText">
            Нет заявок
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
