import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Tooltip, Typography } from '@mui/material'
import { resultsDialogState } from '../reactive-vars'
import { StyledButton } from '../dashboard/styled-components'
import { useReactiveVar } from '@apollo/client'
import { useWindowWidth } from '@react-hook/window-size'
import CardTooltip from '../CardTooltip'
import Confetti from 'react-confetti'
import React, { useState } from 'react'

export default function WinDialog({ results }) {
  const [tooltip, setTooltip] = useState(false)
  const resultsState = useReactiveVar(resultsDialogState)
  const correctCard = results.find(r => r?.correct)
  const width = useWindowWidth()

  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

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
      <Dialog open={resultsState === 'open'} onClose={() => resultsDialogState('closed')} maxWidth='xs' fullWidth hideBackdrop>
        <DialogTitle textAlign='center' variant='h3'>
          Victory!
        </DialogTitle>
        <DialogContent sx={{ p: 0 }} dividers={false}>
          <Stack alignItems='center'>
            <CardTooltip image={correctCard?.image} name={correctCard?.name}>
              <img
                src={correctCard?.image}
                alt={correctCard?.name || ''}
                style={{ margin: '16px', height: '312px', width: '204px' }}
              />
            </CardTooltip>
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
                <ImageList cols={Math.min(3, correctCard?.otherCards?.length)} sx={{ m: 1 }}>
                  {correctCard?.otherCards.map((item) => (
                    <CardTooltip key={item.name} image={item.image} name={item.name}>
                      <ImageListItem sx={{ maxWidth: '140px' }}>
                        <img src={item.image} alt={item.name} />
                      </ImageListItem>
                    </CardTooltip>
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

function shareText(results) {
  const maxResults = 5
  const trimmed = results.reverse().slice(0, maxResults)
  const result = trimmed.map(toEmojiRow).join('\n')
  const more = results.length > maxResults ? `➕${numberToEmoji(results.length - maxResults)} more` : ''
  return `I found the LoRdle card in classic mode in ${results.length} attempts!
${result}
${more}
https://lordle.gg`
}

const numberToEmoji = (number) => number.toString().split('').map(digitToEmoji)

function digitToEmoji(digit) {
  switch (digit) {
    case '0':
      return '0️⃣'
    case '1':
      return '1️⃣'
    case '2':
      return '2️⃣'
    case '3':
      return '3️⃣'
    case '4':
      return '4️⃣'
    case '5':
      return '5️⃣'
    case '6':
      return '6️⃣'
    case '7':
      return '7️⃣'
    case '8':
      return '8️⃣'
    case '9':
      return '9️⃣'
    default:
      return ''
  }
}

const toEmojiRow = (guess) => [
  guess.regionResult,
  guess.rarityResult,
  guess.manaCostResult,
  guess.typeResult,
  guess.setResult,
].map(resultToEmoji).join('')

function resultToEmoji({ result }) {
  switch (result) {
    case 'CORRECT':
      return '🟩'
    case 'WRONG':
      return '🟥'
    case 'PARTIAL':
      return '🟧'
    case 'UP':
      return '⬆️'
    case 'DOWN':
      return '⬇️'
    default:
      return ''
  }
}
