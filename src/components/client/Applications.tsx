import { Alert, AlertColor, Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { ApplicationItem } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { fetchApplicationItems } from 'service/fetchApplicationItems'

const columns: GridColDef[] = [
  {
    field: 'applicationId',
    headerName: 'Номер заявки',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'itemTypeId',
    headerName: 'Тип оборудование',
    width: 170,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Наименование',
    width: 250,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'count',
    headerName: 'Количество',
    width: 120,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 160,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const status = params.row.status
      let color
      if (status === 'Используется') {
        color = 'info'
      }
      if (status === 'В обработке') {
        color = 'warning'
      }
      if (status === 'Выполнена') {
        color = 'success'
      }
      return (
        <Alert
          sx={{ p: '0px 10px' }}
          icon={false}
          severity={color as AlertColor}
        >
          {status}
        </Alert>
      )
    }
  }
]

export const Applications = () => {
  const { user } = useAuth() as AuthProviderValue

  const [items, setItems] = useState<ApplicationItem[]>([])

  useEffect(() => {
    if (user) {
      fetchApplicationItems(user).then(setItems)
    }
  }, [])

  return (
    <Box sx={{ marginTop: '100px' }}>
      <Stack spacing={2}>
        {!!items.length ? (
          <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={items}
            columns={columns}
            getRowId={(row) => `${row.applicationId}${row.itemTypeId}`}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
          />
        ) : (
          <Typography variant="h5" color="GrayText">
            Вы ещё не сделали ни одной заявки
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
