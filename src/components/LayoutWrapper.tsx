import { Box, Container } from '@mui/material'
import { PropsWithChildren } from 'react'

export const LayoutWrapper = ({ children }: PropsWithChildren) => (
  <Container
    maxWidth="md"
    disableGutters
    sx={
      {
        // border: '1px solid red'
      }
    }
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      {children}
    </Box>
  </Container>
)
