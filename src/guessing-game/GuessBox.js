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
      <Card>
        <CardContent
          sx={{bgcolor: ({palette}) => palette.background.paper, textAlign: "center"}}
        >
          <Typography variant="h6" noWrap={true}>
            {text}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{bgcolor: ({palette}) => correct ? palette.success.main : palette.error.main, padding: "20px"}}
          component="img"
          image={image}
        />
      </Card>
    </Fade>
  )
}