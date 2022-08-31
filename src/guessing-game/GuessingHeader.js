import React from 'react';
import { Grid, Typography } from '@mui/material';

const headerNames = ['Region', 'Rarity', 'Cost', 'Type', 'Expansion'];

export default function GuesssHeader() {
  return (
    <>
      {headerNames.map((headerName, i) => 
        <Grid key={i} item xs={2} sx={{mt: 4, mb: 1}}>
          <Typography variant="h6" sx={{textAlign: "center", borderBottom:1, mr: 1, ml: 1}}>
            {headerName}
          </Typography>
        </Grid>)}
    </>
  )
}