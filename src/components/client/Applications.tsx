import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { ApplicationItem } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { fetchApplicationItems } from 'service/fetchApplicationItems'

const columns: GridColDef[] = [
  { field: 'applicationId', headerName: 'Номер заявки', width: 130 },
  { field: 'itemTypeId', headerName: 'Тип оборудование', width: 170 },
  { field: 'name', headerName: 'Наименование', width: 250 },
  { field: 'count', headerName: 'Количество', width: 120 },
  { field: 'status', headerName: 'Статус', width: 130 }
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
