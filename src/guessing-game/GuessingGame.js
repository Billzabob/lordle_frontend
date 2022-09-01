import GuessInput from './GuessInput';
import GuessRow from './GuessRow';
import GuessHeader from './GuessingHeader';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useLocalStorage } from '../util';

export default function GuessingGame() {
  const [previousGuesses, setPreviousGuesses] = useLocalStorage('oldGuesses', [])
  const [currentGuess, setCurrentGuess] = useLocalStorage('lastGuess', null)

  const setGuess = (guess) => {
    if (currentGuess)
      setPreviousGuesses([...previousGuesses, currentGuess])
    setCurrentGuess(guess)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container columns={12} spacing={2}>
        <Grid item display="flex" justifyContent="center" xs={12}>
          <GuessInput setGuess={setGuess} />
        </Grid>
        {currentGuess && <GuessHeader />}
        {currentGuess && <GuessRow code={currentGuess} isAnimated />}
        {previousGuesses.reverse().map((guess, i) => <GuessRow key={i} code={guess} />)}
      </Grid>
    </Container>
  )
}