import { Fade, Card, CardMedia, CardContent, Typography } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { darkMode } from '../reactive-vars'
import React from 'react'

const getColor = (palette, correct, isDark) => {
  if (isDark && correct === 'partial') return palette.warning.dark
  else if (!isDark && correct === 'partial') return palette.warning.light
  else if (isDark && correct) return palette.success.dark
  else if (!isDark && correct) return palette.success.light
  else if (isDark && !correct) return palette.error.dark
  else if (!isDark && !correct) return palette.error.light
}

const Image = React.memo(
  function Image({ image, correct }) {
    const isDark = useReactiveVar(darkMode)
    return (
      <CardMedia
        sx={{
          bgcolor: ({ palette }) => getColor(palette, correct, isDark),
          p: correct === 'partial' ? 1 : 3
        }}
        component='img'
        image={image}
      />
    )
  }
)

export default function GuessBox({ correct, text, position, image }) {
  return (
    <Fade
      direction='up'
      in
      timeout={750}
      style={{ transitionDelay: `${position * 500}ms` }}
    >
      <Card variant='outlined'>
        <CardContent
          sx={{ bgcolor: ({ palette }) => palette.background.paper, textAlign: 'center' }}
        >
          <Typography variant='h8' noWrap sx={{ display: 'block' }}>{text}</Typography>
        </CardContent>
        <Image image={image} correct={correct} />
      </Card>
    </Fade>
  )
}