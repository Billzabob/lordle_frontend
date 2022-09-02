import { Fade, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';

const Image = React.memo(
  function Image({image, correct}) {
    return (
      <CardMedia
      sx={{bgcolor: ({palette}) => correct ? palette.success.main : palette.error.main, p: 3}}
      component="img"
      image={image}
    />
    )
  }
)

export default function GuessBox ({correct, text, position, image, isAnimated}) {
  return (
    <React.Fragment>
      {
        isAnimated 
        ?
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
              <Image image={image} correct={correct} />
            </Card>
          </Fade>
        :
        <Card variant="outlined">
          <CardContent
            sx={{bgcolor: ({palette}) => palette.background.paper, textAlign: "center"}}
          >
            <Typography variant="h8" noWrap sx={{display: "block"}}>{text}</Typography>
          </CardContent>
          <Image image={image} correct={correct}/>
        </Card>
      }

    </React.Fragment>
  )
}