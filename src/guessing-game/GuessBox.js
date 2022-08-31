import { Fade, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';

export default function GuessBox({correct, text, position, image}) {
  return (
    <Fade
      direction='up'
      in={true}
      timeout={750}
      style={{ transitionDelay: `${position * 500}ms` }}
    >
      <Card variant="outlined">
        <CardContent
          sx={{bgcolor: ({palette}) => palette.background.paper, textAlign: "center"}}
        >
          <Typography variant="h8" noWrap sx={{display: "block"}}>{text}</Typography>
        </CardContent>
        <CardMedia
          sx={{bgcolor: ({palette}) => correct ? palette.success.main : palette.error.main, p: 3}}
          component="img"
          image={image}
        />
      </Card>
    </Fade>
  )
}