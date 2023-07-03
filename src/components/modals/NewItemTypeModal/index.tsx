import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { addNewItemType } from 'service/addNewItemType'

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

export interface NewItemTypeModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewItemTypeModal({
  open,
  setOpen
}: NewItemTypeModalProps) {
  const [type, setType] = useState('')

  const handleAddItemType = async () => {
    const message = await addNewItemType(type)

    if (message === 'error') {
      alert('Такой тип оборудования уже существует')
    } else {
      setOpen(false)
    }
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Stack direction="column" spacing={3}>
          <Stack alignItems="center">
            <Typography variant="h6" component="h2" color="ButtonText">
              Новое оборудование
            </Typography>
          </Stack>
          <TextField
            value={type}
            onChange={(e) => setType(e.target.value.toLowerCase())}
            size="small"
            placeholder="Наименование"
          />
          <Stack direction="row" justifyContent="end">
            <Button
              disabled={type === ''}
              variant="contained"
              size="small"
              onClick={handleAddItemType}
            >
              Поставить на учёт
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
