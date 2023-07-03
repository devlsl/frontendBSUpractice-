import { Alert, AlertColor, Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { CertainItem, LogItem } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'

import { fetchItemsLog } from 'service/fetchItemsLog'
import { capitalize } from 'utils/capitalize'

export const ItemsLog = () => {
  const { user } = useAuth() as AuthProviderValue

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
      field: 'status',
      headerName: 'Статус',
      width: 160,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = capitalize(params.row.status)
        let color
        if (status === 'Возврат') {
          color = 'success'
        }
        if (status === 'Выдача') {
          color = 'info'
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

  // const [items, setItems] = useState<CountedTypedItem[]>([])
  const [items, setItems] = useState<LogItem[]>([])

  useEffect(() => {
    if (user) {
      try {
        fetchItemsLog().then((fetchedItems) => {
          setItems(
            fetchedItems.map((item) => ({
              ...item,
              date: new Date(item.date).toLocaleString().split(', ')[0]
            }))
          )
        })
      } catch (error) {
        alert(error.message)
      }
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
            getRowId={(row) => `${row.applicationId}${row.itemId}${row.status}`}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
          />
        ) : (
          <Typography variant="h5" color="GrayText">
            Нет записей
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
