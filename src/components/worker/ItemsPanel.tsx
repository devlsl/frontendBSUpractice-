import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'
import { CertainItem, CountedItem, CountedTypedItem } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import { fetchAvailableItems } from 'service/fetchAvailableItems'
import ArticleIcon from '@mui/icons-material/Article'
import AddIcon from '@mui/icons-material/Add'
import NewItemTypeModal from 'components/modals/NewItemTypeModal'
import NewItemModal from 'components/modals/NewItemModal'

export interface FetchedItemsWithCount extends CertainItem, CountedItem {}

export const ItemsPanel = () => {
  const { user } = useAuth() as AuthProviderValue

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Наименование',
      width: 220,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'count',
      headerName: 'Количество на складе',
      width: 220,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'action',
      headerName: 'Оборудование на складе',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      width: 300,
      renderCell: (params) => {
        return (
          <Autocomplete
            disablePortal
            options={availableItems
              .filter((item) => item.itemTypeId === params.row.itemTypeId)
              .map((item) => ({ label: item.itemId }))}
            sx={{ width: 200 }}
            size="small"
            renderInput={(params) => <TextField {...params} />}
          />
        )
      }
    }
  ]

  // const [items, setItems] = useState<CountedTypedItem[]>([])
  const [items, setItems] = useState<CountedTypedItem[]>([])
  const [availableItems, setAvailableItems] = useState<CertainItem[]>([])
  const [openNewItemModal, setOpenNewItemModal] = useState(false)
  const [openNewItemTypeModal, setOpenNewItemTypeModal] = useState(false)

  useEffect(() => {
    fetchAvailableItems().then(setAvailableItems)
  }, [openNewItemModal, openNewItemTypeModal])

  useEffect(() => {
    if (user) {
      fetchAvailableItems().then((fetchedItems) => {
        // const selectedItemsCount = [1, 2, 3].reduce(
        //   (result, item) => result + item.selectedItemIds.length,
        //   0
        // )

        const fetchedItemsWithCount: FetchedItemsWithCount[] = fetchedItems.map(
          (item) => ({
            ...item,
            count: fetchedItems.filter(
              (el) => el.itemTypeId === item.itemTypeId
            ).length
          })
        )

        const items = fetchedItemsWithCount.reduce(
          (result, item) =>
            result.find((el) => el.itemTypeId === item.itemTypeId)
              ? result
              : [
                  ...result,
                  {
                    itemTypeId: item.itemTypeId,
                    name: item.name,
                    count: item.count
                  } as CountedTypedItem
                ],
          [] as CountedTypedItem[]
        )
        console.log(items)
        setItems(items)
        // }
      })
    }
  }, [openNewItemModal, openNewItemTypeModal])

  return (
    <Box sx={{ marginTop: '100px' }}>
      <NewItemTypeModal
        open={openNewItemTypeModal}
        setOpen={setOpenNewItemTypeModal}
      />
      <NewItemModal open={openNewItemModal} setOpen={setOpenNewItemModal} />
      <Stack spacing={2} direction="column">
        <Stack spacing={2}>
          {!!items.length ? (
            <DataGrid
              localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
              rows={items}
              columns={columns}
              getRowId={(row) => row.itemTypeId}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
            />
          ) : (
            <Typography variant="h5" color="GrayText">
              Нет предметов
            </Typography>
          )}
        </Stack>
        <Stack
          // height={35}
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            startIcon={<ArticleIcon />}
            sx={{ textTransform: 'none' }}
            fullWidth
            variant="contained"
            onClick={() => setOpenNewItemTypeModal(true)}
          >
            Новый тип оборудования
          </Button>
          <Button
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
            fullWidth
            variant="contained"
            onClick={() => setOpenNewItemModal(true)}
          >
            Новое оборудование
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
