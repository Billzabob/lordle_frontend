import React from 'react'
import { Box, Typography } from '@mui/material'

export default function MainGameTitle() {
  return (
    <Box display='flex' justifyContent='center' sx={{ mx: 2 }}>
      <Typography variant='h5' sx={{ mt: 3, textAlign: 'center' }}>
        Guess today's Legends of Runeterra card
      </Typography>
    </Box>
  )
}