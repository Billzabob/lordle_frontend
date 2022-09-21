import { Fade, Card, CardMedia, CardContent, Typography } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { darkMode } from '../reactive-vars'
import React from 'react'
import { Box } from '@mui/system'

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
        style={{width: '127px', height: '127px'}}
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
      style={{ transitionDelay: `${position * 350}ms` }}
    >
      <Card variant='outlined'>
        <CardContent
          sx={{ p: 0, bgcolor: ({ palette }) => palette.background.paper, textAlign: 'center' }}
        >
          <Box sx={{p: 1, height: 55}} display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='body2'>{text}</Typography>
          </Box>
        </CardContent>
        <Image image={image} correct={correct} />
      </Card>
    </Fade>
  )
}