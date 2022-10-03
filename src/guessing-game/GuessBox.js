import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import { darkMode } from '../reactive-vars'
import { useCompactMode } from '../util'
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
  function Image({ image, correct, padding, onLoad, small }) {
    const isDark = useReactiveVar(darkMode)
    return (
      <CardMedia
        sx={{
          bgcolor: ({ palette }) => getColor(palette, correct, isDark),
          width: '100%',
          aspectRatio: small ? '0.664' : '1'
        }}
      >
        <Box display='flex' flexDirection='column' justifyContent='center' sx={{ height: '100%' }}>
          <img
            src={image}
            alt='category'
            onLoad={onLoad}
            style={{ margin: small ? '8%' : (padding ? '10%' : '20%'), objectFit: 'contain' }}
          />
        </Box>
      </CardMedia>
    )
  }
)

export default function GuessBox({ correct, text, position, image, padding, animate, run, onLoad, onDone }) {
  const small = useCompactMode()

  return (
    <CardFlip delay={position * 350} animate={animate} run={run} onEntered={onDone}>
      <Box sx={{ pb: small ? 1 : 2 }}>
        <div style={{ filter: 'drop-shadow(5px 5px 5px black)' }}>
          <Card variant='outlined'>
            {!small &&
              <CardContent
                sx={{ p: 0, bgcolor: ({ palette }) => palette.background.paper, textAlign: 'center' }}
              >
                <Box sx={{ p: 1, height: 55 }} display='flex' justifyContent='center' alignItems='center'>
                  <Typography variant='body2'>{text}</Typography>
                </Box>
              </CardContent>
            }
            <Image image={image} correct={correct} padding={padding} onLoad={onLoad} small={small} />
          </Card>
        </div>
      </Box>
    </CardFlip>
  )
}