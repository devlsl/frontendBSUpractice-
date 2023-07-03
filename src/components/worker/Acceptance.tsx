import { Box, Button, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { AcceptanceItem } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { fetchDeliveredItems } from 'service/fetchDeliveredItems'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import AcceptItemModal from 'components/modals/AcceptItemModal'

export const Acceptance = () => {
  const { user } = useAuth() as AuthProviderValue

  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [row, setRow] = useState()

  const columns: GridColDef[] = [
    {
      field: 'applicationId',
      headerName: 'Номер заявки',
      width: 130,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'itemId',
      headerName: 'Инвентарный номер',
      width: 170,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'name',
      headerName: 'Наименование',
      width: 200,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'clientLogin',
      headerName: 'Логин пользователя',
      width: 170,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'date',
      headerName: 'Дата',
      width: 120,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'comment',
      headerName: 'Комментарий',
      width: 250,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'action',
      headerName: 'Приём',
      width: 70,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
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
            <BookmarkAddedIcon color="action" />
          </Button>
        )
      }
    }
  ]

  const [items, setItems] = useState<AcceptanceItem[]>([])

  useEffect(() => {
    if (user) {
      fetchDeliveredItems().then((fetchedItems) => {
        console.log(fetchedItems)
        setItems(
          fetchedItems.map((item) => ({
            ...item,
            date: new Date(item.date).toLocaleString().split(', ')[0]
          }))
        )
      })
    }
  }, [open])

  return (
    <Box sx={{ marginTop: '100px' }}>
      {open && (
        <AcceptItemModal
          open={open}
          setOpen={setOpen}
          comment={comment}
          setComment={setComment}
          row={row}
        />
      )}
      <Stack spacing={2}>
        {!!items.length ? (
          <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            rows={items}
            columns={columns}
            getRowId={(row) => `${row.applicationId}${row.itemId}`}
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
