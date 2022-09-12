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
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <GuessInput setGuess={setGuess} />
      {
        guesses.length > 0 &&
        <Grid container columns={12} spacing={2} minWidth={800}>
          <GuessHeader/>
          <GuessRow code={guesses[0]} isAnimated />
          {guesses.slice(1).map((guess, i) => <GuessRow key={i} code={guess} />)}
        </Grid>
      }
    </Container>
  )
}