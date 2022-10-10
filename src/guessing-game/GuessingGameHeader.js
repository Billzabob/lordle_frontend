import { Box, Stack } from '@mui/material'
import { StyledButton } from '../dashboard/styled-components'
import Countdown from './Countdown'
import GuessInput from '../guessing-game/GuessInput'
import React from 'react'

export default function GuessingGameHeader({ guesses, setGuess, correct, dialogState, sx }) {
  return (
    <Box sx={sx}>
      {
        correct ?
          <Stack>
            <Countdown />
            <Box display='flex' justifyContent='center'>
              <StyledButton onClick={() => dialogState('open')} sx={{ width: '100px' }} variant='contained'>Results</StyledButton>
            </Box>
          </Stack> :
          <GuessInput setGuess={setGuess} guesses={guesses} />
      }
    </Box>
  )
}
