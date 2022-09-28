import { Box, Stack } from '@mui/material'
import { resultsDialogState } from '../reactive-vars'
import { StyledButton } from '../dashboard/styled-components'
import Countdown from './Countdown'
import GuessInput from '../guessing-game/GuessInput'
import React from 'react'

export default function GuessingGameHeader({ guesses, setGuess, correct }) {
  return (
    false ?
      <Stack sx={{ mt: 2 }}>
        <Countdown />
        <Box display='flex' justifyContent='center'>
          <StyledButton onClick={() => resultsDialogState('open')} sx={{ width: '100px' }} variant='contained'>Results</StyledButton>
        </Box>
      </Stack> :
      <GuessInput setGuess={setGuess} guesses={guesses} />
  )
}
