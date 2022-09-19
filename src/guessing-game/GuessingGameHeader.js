import { Box, Button, Stack } from '@mui/material'
import { correctAnswer, resultsDialogOpen } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import Countdown from '../dashboard/countdown'
import GuessInput from '../guessing-game/GuessInput'
import React from 'react'

export default function GuessingGameHeader({ guesses, setGuess }) {
  const answered = useReactiveVar(correctAnswer)

  return (
    answered ?
      <Stack sx={{ mt: 2 }}>
        <Countdown />
        <Box display='flex' justifyContent='center'>
          <Button onClick={() => resultsDialogOpen(true)} sx={{ width: '100px' }} variant='contained'>Results</Button>
        </Box>
      </Stack> :
      <GuessInput setGuess={setGuess} guesses={guesses} />
  )
}
