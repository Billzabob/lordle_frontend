import GuessInput from './GuessInput';
import GuessRow from './GuessRow';
import GuesssHeader from './GuessingHeader';
import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';

export default function GuessingGame() {
  const [guesses, setGuesses] = useState([])
  
  const setGuess = (guess) => setGuesses(guesses => [...guesses, guess])

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container columns={10} spacing={2}>
        <Grid item display="flex" justifyContent="center" xs={12}>
          <GuessInput setGuess={setGuess} />
        </Grid>
        {guesses.length > 0 && <GuesssHeader/>}
        {guesses.map((guess, i) => <GuessRow key={i} code={guess}/>)}
      </Grid>
    </Container>
  )
}