import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Tooltip, Typography } from '@mui/material'
import { StyledButton } from '../dashboard/styled-components'
import { useReactiveVar } from '@apollo/client'
import { useWindowWidth } from '@react-hook/window-size'
import Confetti from 'react-confetti'
import React, { useState } from 'react'

export default function WinDialog({ results, dialogState, shareText }) {
  const [tooltip, setTooltip] = useState(false)
  const resultsState = useReactiveVar(dialogState)
  const correctCard = results.find(r => r?.correct)
  const width = useWindowWidth()

  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  )

  return (
    <>
      {resultsState === 'open' &&
        <Confetti
          width={width}
          height={scrollHeight}
          style={{ zIndex: 1301 }}
          recycle={false}
          numberOfPieces={500}
          gravity={0.8}
          colors={['#0DAB5F', '#388AFE', '#EE5BFF', '#EA923F']}
        />
      }
      <Dialog open={resultsState === 'open'} onClose={() => dialogState('closed')} maxWidth='xs' fullWidth hideBackdrop>
        <DialogTitle textAlign='center' variant='h3'>
          Victory!
        </DialogTitle>
        <DialogContent sx={{ p: 0 }} dividers={false}>
          <Stack alignItems='center'>
            <img
              src={correctCard?.image}
              alt={correctCard?.name || ''}
              style={{ margin: '16px', height: '312px', width: '204px' }}
            />
            <Tooltip open={tooltip} onClose={() => setTooltip(false)} title='Copied to clipboard!'>
              <StyledButton onClick={() => {
                setTooltip(true)
                navigator.clipboard.writeText(shareText(results))
              }} sx={{ width: '100px', mt: 2, mb: 4 }} variant='contained'>Share</StyledButton>
            </Tooltip>
            {
              (correctCard?.otherCards || []).length > 0 &&
              <>
                <Typography variant='h4' sx={{ textAlign: 'center', mt: 0 }}>
                  Other Answers
                </Typography>
                <ImageList cols={Math.min(3, correctCard?.otherCards?.length)} sx={{ m: 1, mb: 3 }}>
                  {correctCard?.otherCards.map((item) => (
                    <ImageListItem sx={{ maxWidth: '140px' }}>
                      <img src={item.image} alt={item.name} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            }
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
