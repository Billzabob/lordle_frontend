import { Box, Paper } from '@mui/material';
import React from 'react';

export default function GuessBox({correct, text}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper
        sx={{
          // Can't figure out the color pallette thing so hardcoding them for now
          bgcolor: correct ? '#388e3c' : '#d32f2f',
          textAlign: 'center',
          height: 128,
          lineHeight: '128px',
        }}
      >
      {text}
      </Paper>
    </Box>
  )
}