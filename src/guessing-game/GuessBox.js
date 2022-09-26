import { Box } from '@mui/system'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { darkMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import CardFlip from './CardFlip'
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
  function Image({ image, correct, padding }) {
    const isDark = useReactiveVar(darkMode)
    return (
      <CardMedia
        sx={{
          bgcolor: ({ palette }) => getColor(palette, correct, isDark),
          p: padding || 3
        }}
        style={{width: '127px', height: '127px'}}
        component='img'
        image={image}
      />
    )
  }
)

export default function GuessBox({ correct, text, position, image, padding, animate }) {
  return (
    <CardFlip delay={position * 350} animate={animate}>
      <Card variant='outlined'>
        <CardContent
          sx={{ p: 0, bgcolor: ({ palette }) => palette.background.paper, textAlign: 'center' }}
        >
          <Box sx={{p: 1, height: 55}} display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='body2'>{text}</Typography>
          </Box>
        </CardContent>
        <Image image={image} correct={correct} padding={padding} />
      </Card>
    </CardFlip>
  )
}