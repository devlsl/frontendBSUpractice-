import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Autocomplete, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { TypedItem } from 'data/types'
import { fetchItemTypes } from 'service/fetchItemTypes'
import { capitalize } from 'utils/capitalize'
import { addNewItem } from 'service/addNewItem'
import { deCapitalize } from 'utils/deCapitalize'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export interface NewItemModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewItemModal({ open, setOpen }: NewItemModalProps) {
  const [itemTypes, setItemTypes] = useState<TypedItem[]>([])
  const [itemType, setItemType] = useState<string>('')

  const handleAddItem = () => {
    const itemTypeId = itemTypes.find(
      (type) => type.name === deCapitalize(itemType)
    )?.itemTypeId

    if (itemTypeId) {
      addNewItem(itemTypeId)
    }

    setOpen(false)
  }

  useEffect(() => {
    fetchItemTypes().then(setItemTypes)
  }, [open])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Stack direction="column" spacing={3}>
          <Stack alignItems="center">
            <Typography variant="h6" component="h2" color="ButtonText">
              Новое оборудование
            </Typography>
          </Stack>
          {itemTypes && (
            <Autocomplete
              value={{ label: itemType }}
              onChange={(_event, newValue) =>
                setItemType(newValue?.label.toString() ?? '')
              }
              disablePortal
              options={itemTypes
                .map((item) => ({
                  label: capitalize(item.name)
                }))
                .concat({ label: '' })}
              size="small"
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          <Stack direction="row" justifyContent="end">
            <Button
              disabled={itemType === ''}
              variant="contained"
              size="small"
              onClick={handleAddItem}
            >
              Поставить на учёт
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
