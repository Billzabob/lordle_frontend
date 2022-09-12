import GuessInput from './GuessInput'
import GuessRow from './GuessRow'
import GuessHeader from './GuessHeader'
import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'

export default function GuessingGame() {
  const [guesses, setGuesses] = useState([])

  const setGuess = (guess) => {
    setGuesses([guess, ...guesses])
  }

  return (
    <>
      <GuessInput setGuess={setGuess} guesses={guesses} />
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {
          guesses.length > 0 &&
          <Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
            {guesses.map((guess, i) => <GuessRow isAnimated={i === 0} key={guess} code={guess} />)}
          </Grid>
        }
      </Container>
    </>
  )
}