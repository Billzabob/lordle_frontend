import { Slide, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';

export default function GuessBox({correct, text, position, image}) {
  return (
    <Slide
      direction='up'
      in={true}
      timeout={1000}
      style={{ transitionDelay: `${position * 500}ms` }}
    >
      <Card>
        <CardContent
          sx={{bgcolor: ({palette}) => palette.background.paper}}
        >
          <Typography variant="subtitle1" noWrap={true}>
            {text}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{bgcolor: ({palette}) => correct ? palette.success.main : palette.error.main}}
          component="img"
          image={image}
        />
      </Card>
    </Slide>
  )
}