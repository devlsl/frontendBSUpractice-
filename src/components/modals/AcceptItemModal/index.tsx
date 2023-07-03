import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Stack, TextareaAutosize } from '@mui/material'
import { acceptItem } from 'service/acceptItem'

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

export interface AcceptItemModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  row: any
}

export default function AcceptItemModal({
  open,
  setOpen,
  comment,
  setComment,
  row
}: AcceptItemModalProps) {
  const handleAcceptItem = () => {
    acceptItem(row.itemId, row.applicationId, row.clientLogin, comment)
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Stack alignItems="center">
          <Typography variant="h6" component="h2" color="ButtonText">
            Приём товара
          </Typography>
        </Stack>

        <TextareaAutosize
          placeholder="Комментарий"
          style={{
            border: '2px solid grey',
            width: '100%',
            height: '100px',
            marginTop: '15px',
            padding: '3px',
            fontFamily: 'sans-serif',
            fontSize: '18px',
            resize: 'none'
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" size="small" onClick={handleAcceptItem}>
            Принять
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
