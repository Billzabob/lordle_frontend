import { Fade, Grid, Typography } from '@mui/material'
import { useCompactMode } from '../util'
import React from 'react'

const headerNames = ['Card', 'Region', 'Rarity', 'Cost', 'Type', 'Set']

export default function GuessHeader() {
  const small = useCompactMode()

  return (
    <>
      {headerNames.map((headerName, i) =>
        <Grid key={i} item xs={2} sx={{ mt: 2, mb: 1 }}>
          <Fade in timeout={750}>
            <Typography fontSize={small ? 15 : 16} variant='h6' sx={{ textAlign: 'center', borderBottom: 1, mx: small ? 0 : 1 }}>
              {headerName}
            </Typography>
          </Fade>
        </Grid>)}
    </>
  )
}