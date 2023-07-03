import { Alert, Box, Button, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridRowId, ruRU } from '@mui/x-data-grid'
import { Item } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { addNewApplication } from 'service/addNewApplication'
import { fetchItems } from 'service/fetchItems'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Инвентарный номер',
    width: 200,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Наименование',
    width: 250,
    align: 'center',
    headerAlign: 'center'
  }
]

export const NewApplication = () => {
  const [hasAdded, setHasAdded] = useState(false)

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
    setHasAdded(true)
    setTimeout(() => {
      setHasAdded(false)
    }, 3000)
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
        {hasAdded && (
          <Alert severity="success">Заявка была успешно добавлена</Alert>
        )}
      </Stack>
    </Box>
  )
}
