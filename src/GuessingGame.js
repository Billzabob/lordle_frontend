import GuessInput from './GuessInput';
import GuessRow from './GuessRow';
import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';

export default function GuessingGame() {
  const [guesses, setGuesses] = useState([])
  
  const setGuess = (guess) => setGuesses(guesses => [...guesses, guess])

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container columns={10} spacing={2}>
        <Grid item xs={12}>
          <GuessInput setGuess={setGuess} />
        </Grid>
        {guesses.map((guess, i) => <GuessRow key={i} code={guess}/>)}
      </Grid>
    </Container>
  )
}