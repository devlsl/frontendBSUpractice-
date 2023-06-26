import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { fetchAllBorrowedItems } from 'service/fetchAllBorrowedItems'

export interface Item {
  id_request: number,
  id_user: number,
  login: string,
  inv_num: number,
  name: string,
  date: Date
  comment: string
}

const columns: GridColDef[] = [
  { field: 'id_request', headerName: 'ID заявки', width: 100 },
  { field: 'id_user', headerName: 'ID сотрудника', width: 150 },
  { field: 'login', headerName: 'Логин сотрудника', width: 150 },
  { field: 'inv_num', headerName: 'Инвентарный номер', width: 150 },
  { field: 'name', headerName: 'Наименование оборудования', width: 250 },
  { field: 'date', headerName: 'Дата выдачи', width: 250 },
  { field: 'comment', headerName: 'Комментарий', width: 250 }
]

export const Acceptance = () => {
  const [Requests, setItems] = useState<Item[]>([])
  useEffect(() => {
    fetchAllBorrowedItems().then(setItems)
  }, [])
  return (
    <Box sx={{ marginTop: '100px', width: 950 }}>
      <Stack spacing={2}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={Requests}
          columns={columns}
          getRowId={(row) => row?.inv_num}
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
