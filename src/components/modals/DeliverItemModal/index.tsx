import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Alert, MenuItem, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ActiveApplication, CertainItem, DeliveringItem } from 'data/types'
import { fetchAvailableItems } from 'service/fetchAvailableItems'
import { capitalize } from 'utils/capitalize'
import { deliverItems } from 'service/deliverItems'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24
}

export type TypedItemWithoutName = {
  itemTypeId: number
  selectedItemIds: number[]
}

export interface DeliverItemModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  row: ActiveApplication
}

export default function DeliverItemModal({
  open,
  setOpen,
  row
}: DeliverItemModalProps) {
  const [disabled, setDisabled] = useState(true)
  const [availableItems, setAvailableItems] = useState<CertainItem[]>([])
  const [selectedItems, setSelectedItems] = useState<TypedItemWithoutName[]>([])

  useEffect(() => {
    fetchAvailableItems().then(setAvailableItems)
  }, [])

  useEffect(() => {
    setSelectedItems(
      row.items.map((item) => ({
        itemTypeId: item.itemTypeId,
        selectedItemIds: []
      }))
    )
  }, [])

  useEffect(() => {
    const selectedItemsCount = selectedItems.reduce(
      (result, item) => result + item.selectedItemIds.length,
      0
    )
    setDisabled(!selectedItemsCount)
  }, [selectedItems])

  const handleDeliverItem = async () => {
    const requestArr: DeliveringItem[] = []
    selectedItems.forEach((item) => {
      item.selectedItemIds.forEach((id) => {
        requestArr.push({
          applicationId: row.applicationId,
          itemId: id,
          itemTypeId: item.itemTypeId
        })
      })
    })

    const message = await deliverItems(requestArr)

    if (message === 'error') {
      alert(
        'Вы уже выдавали оборудование с таким инвентарным номером в этой заявке'
      )
    } else {
      setOpen(false)
    }
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Stack direction="column" spacing={3} py={3} px={4}>
          <Stack alignItems="center">
            <Typography variant="h6" component="h2" color="ButtonText">
              Выдача товара
            </Typography>
          </Stack>

          <Box height="250px" sx={{ overflowY: 'scroll' }}>
            <Stack justifyContent="center" spacing={2}>
              {row.items.map((item) => (
                <Stack
                  key={item.itemTypeId}
                  px={3}
                  py={2}
                  border="4px solid rgba(0,0,0,0.1)"
                  borderRadius={3}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1}>
                      <Typography fontWeight={800} color="rgba(0,0,0,0.5)">
                        {`${capitalize(item.name)}`}
                      </Typography>
                      <Typography fontWeight={500} color="rgba(0,0,0,0.4)">
                        {`${item.count}шт.`}
                      </Typography>
                    </Stack>
                    {!!availableItems.filter(
                      (el) => el.itemTypeId === item.itemTypeId
                    ).length ? (
                      <TextField
                        sx={{ width: '210px' }}
                        select
                        size="small"
                        label="Инвентарный номер"
                        value={
                          selectedItems.find(
                            (el) => el.itemTypeId === item.itemTypeId
                          )?.selectedItemIds
                        }
                        onChange={(event) => {
                          const value = event.target.value

                          const splitedStringValue =
                            typeof value === 'string'
                              ? (value.split(',') as string[])
                              : (value as string[])

                          const splitedValue: number[] = splitedStringValue.map(
                            (el) => +el
                          )

                          if (splitedValue.length > item.count) return

                          setSelectedItems((prev) =>
                            prev.map((el) =>
                              el.itemTypeId === item.itemTypeId
                                ? {
                                    itemTypeId: el.itemTypeId,
                                    selectedItemIds: splitedValue
                                  }
                                : el
                            )
                          )
                        }}
                        SelectProps={{
                          multiple: true
                        }}
                      >
                        {availableItems
                          .filter((el) => el.itemTypeId === item.itemTypeId)
                          .map((availableItem) => (
                            <MenuItem
                              key={availableItem.itemId}
                              value={availableItem.itemId}
                            >
                              {availableItem.itemId}
                            </MenuItem>
                          ))}
                      </TextField>
                    ) : (
                      <Alert
                        sx={{ p: '0px 10px' }}
                        icon={false}
                        severity="error"
                      >
                        Нет в наличии
                      </Alert>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'end' }}>
            <Button
              disabled={disabled}
              variant="contained"
              size="small"
              onClick={handleDeliverItem}
            >
              Выдать
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}
