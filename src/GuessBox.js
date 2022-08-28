import { Slide, Paper } from '@mui/material';
import React from 'react';

export default function GuessBox({correct, text, position}) {
  return (
    <Slide
      direction='up'
      in={true}
      timeout={1000}
      style={{ transitionDelay: `${position * 500}ms` }}
    >
      <Paper
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? (correct ? theme.palette.info : theme.palette.warning)
              : (correct ? theme.palette.success.dark : theme.palette.error.dark),
          textAlign: 'center',
          height: {
            xs: 50,
            sm: 95,
            md: 128,
            lg: 200,
            xl: 220,
          },
          lineHeight: {
            xs: '50px',
            sm: '95px',
            md: '128px',
            lg: '200px',
            xl: '220px',
          },
          width: {
            xs: 50,
            sm: 95,
            md: 128,
            lg: 200,
            xl: 220,
          },
          height: {
            xs: 50,
            sm: 95,
            md: 128,
            lg: 200,
            xl: 220,
          }
        }}
      >
      {text}
      </Paper>
    </Slide>
  )
}