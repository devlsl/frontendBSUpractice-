import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { fetchItems } from 'service/fetchItems'

export interface Item {
  id: number
  name: string
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Инвентарный номер', width: 200 },
  { field: 'name', headerName: 'Наименование', width: 200 }
]

export const NewApplication = () => {
  const [items, setItems] = useState<Item[]>([])
  const [checkedIdItems, setCheckedIdItems] = useState<number[]>([])
  console.log(checkedIdItems)

  useEffect(() => {
    fetchItems().then(setItems)
  }, [])

  return (
    <Box sx={{ marginTop: '100px', width: 500 }}>
      <DataGrid
        rows={items}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        checkboxSelection
        // onCellClick={(cell) => {
        //   setChackedIdItems((prev) => {
        //     const id = prev.filter((id) => cell.id === id)
        //     console.log(id)
        //     return prev
        //     // return [...prev, !!id.length ? cell.id : null]
        //   })
        // }}
        onCellClick={(cell) => {
          // if (checkedIdItems.find((id) => id === cell.id)) {
          //   setCheckedIdItems((prev) => [...prev, cell.id])
          // }
        }}
      />
    </Box>
  )
}
