import { Box, Button, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridRowId, ruRU } from '@mui/x-data-grid'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { addNewApplication } from 'service/addNewApplication'
import { fetchItems } from 'service/fetchItems'

export interface Item {
  id: number
  name: string
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Инвентарный номер', width: 200 },
  { field: 'name', headerName: 'Наименование', width: 250 }
]

export const NewApplication = () => {
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<GridRowId[]>([])

  useEffect(() => {
    fetchItems().then(setItems)
  }, [])

  const { user } = useAuth() as AuthProviderValue
  const handleSubmitApplication = () => {
    if (user) {
      addNewApplication(user, selectedItems as number[])
    }
  }

  return (
    <Box sx={{ marginTop: '100px', width: 500 }}>
      <Stack spacing={2}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          checkboxSelection
          
          onRowSelectionModelChange={(selectedIds) =>
            setSelectedItems(selectedIds)
          }
        />
        <Button
          color="info"
          variant="contained"
          onClick={handleSubmitApplication}
        >
          Сделать заявку
        </Button>
      </Stack>
    </Box>
  )
}
