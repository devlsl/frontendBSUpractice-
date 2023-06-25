import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { fetchAllRequests } from 'service/fetchAllRequests'

export interface Request {
  id_request: number,
  id_user: number,
  login: string,
  id_tool_type: number,
  name: string,
  num: number
}

const columns: GridColDef[] = [
  { field: 'id_request', headerName: 'ID заявки', width: 100 },
  { field: 'id_user', headerName: 'ID сотрудника', width: 150 },
  { field: 'login', headerName: 'Логин сотрудника', width: 150 },
  { field: 'id_tool_type', headerName: 'ID оборудования', width: 150 },
  { field: 'name', headerName: 'Наименование оборудования', width: 250 },
  { field: 'num', headerName: 'Количество', width: 100 }
]

export const Delivery = () => {
  const [Requests, setRequests] = useState<Request[]>([])
  useEffect(() => {
    fetchAllRequests().then(setRequests)
  }, [])
  return (
    <Box sx={{ marginTop: '100px', width: 950 }}>
      <Stack spacing={2}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={Requests}
          columns={columns}
          getRowId={(row) => row?.id_request + " " + row?.id_tool_type}
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
