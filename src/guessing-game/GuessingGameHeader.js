import { useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'
import { Box, Button, Stack, Tooltip } from '@mui/material'
import GuessInput from '../guessing-game/GuessInput'
import { correct } from '../dashboard'
import Countdown from '../dashboard/countdown'

export default function GuessingGameHeader({ guesses, setGuess }) {
  const answered = useReactiveVar(correct)
  const [tooltip, setTooltip] = useState(false)

  return (
    answered ?
      <Stack sx={{ mt: 2 }}>
        <Countdown />
        <Box display='flex' justifyContent='center'>
          <Tooltip open={tooltip} onClose={() => setTooltip(false)} title='Copied to clipboard!'>
            <Button onClick={() => {
              setTooltip(true)
              navigator.clipboard.writeText(shareText(guesses))
            }} sx={{ width: '100px' }} variant='contained'>Share</Button>
          </Tooltip>
        </Box>
      </Stack> :
      <GuessInput setGuess={setGuess} guesses={guesses} />
  )
}

function shareText(guesses) {
  console.log(guesses)
  return 'foo'
}