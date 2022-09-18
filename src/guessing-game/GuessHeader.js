import React from 'react'
import { Fade, Grid, Typography } from '@mui/material'

const headerNames = ['Card', 'Region', 'Rarity', 'Cost', 'Type', 'Set']

export default function GuessHeader() {
  return (
    <>
      {headerNames.map((headerName, i) =>
        <Grid key={i} item xs={2} sx={{ mt: 2, mb: 1 }}>
          <Fade in timeout={750}>
            <Typography variant='h6' sx={{ textAlign: 'center', borderBottom: 1, mx: 1 }}>
              {headerName}
            </Typography>
          </Fade>
        </Grid>)}
    </>
  )
}