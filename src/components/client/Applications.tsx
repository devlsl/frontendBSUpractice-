import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { fetchRequests } from 'service/fetchRequests'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'

export interface Request {
  id_request: number,
  name: string,
  num: number
}

const columns: GridColDef[] = [
  { field: 'id_request', headerName: 'ID заявки', width: 100 },
  { field: 'name', headerName: 'Наименование оборудования', width: 250 },
  { field: 'num', headerName: 'Количество', width: 100 }
]

export const Applications = () => {
  const [Requests, setRequests] = useState<Request[]>([])
  const { user } = useAuth() as AuthProviderValue
  useEffect(() => {
    fetchRequests(user?.id!).then(setRequests)
  }, [])
  return (
    <Box sx={{ marginTop: '100px', width: 500 }}>
      <Stack spacing={2}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={Requests}
          columns={columns}
          getRowId={(row) => row?.id_request + " " +  row?.name}
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
