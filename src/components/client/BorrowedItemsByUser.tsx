import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { fetchBorrowedItemsByUser } from 'service/fetchBorrowedItemsByUser'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'

export interface Item {
  inv_num: number,
  id_request: number,
  name: string,
  date: Date
}

const columns: GridColDef[] = [
  { field: 'inv_num', headerName: 'Инвентарный номер', width: 250 },
  { field: 'id_request', headerName: 'ID заявки', width: 100 },
  { field: 'name', headerName: 'Наименование оборудования', width: 250 },
  { field: 'date', headerName: 'Дата выдачи', width: 150 }
]

export const BorrowedItemsByUser = () => {
  const [Items, setItems] = useState<Item[]>([])
  const { user } = useAuth() as AuthProviderValue
  useEffect(() => {
    fetchBorrowedItemsByUser(user?.id!).then(setItems)
  }, [])
  return (
    <Box sx={{ marginTop: '100px', width: 1000 }}>
      <Stack spacing={2}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={Items}
          columns={columns}
          getRowId={(row) => row?.inv_num!}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          
        />
      </Stack>
    </Box>
  )
}
