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
      <GuessInput setGuess={setGuess} />
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {
          guesses.length > 0 &&
          <Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
            <GuessRow code={guesses[0]} isAnimated />
            {guesses.slice(1).map((guess, i) => <GuessRow key={i} code={guess} />)}
          </Grid>
        }
      </Container>
    </>
  )
}