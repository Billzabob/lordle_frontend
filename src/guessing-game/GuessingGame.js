import GuessInput from './GuessInput';
import GuessRow from './GuessRow';
import GuessHeader from './GuessHeader';
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useLocalStorage } from '../util';
import WinDialog from './WinDialog';

export default function GuessingGame() {
  const [guesses, setGuesses] = useLocalStorage('guesses', [])
  
  const setGuess = (guess) => {
    setGuesses([guess, ...guesses])
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container columns={12} spacing={2}>
        <Grid item display="flex" justifyContent="center" xs={12}>
          <GuessInput setGuess={setGuess} />
        </Grid>
        {
          guesses.length > 0 &&
          <React.Fragment>
            <GuessHeader/>
            <GuessRow code={guesses[0]} isAnimated />
            {guesses.slice(1).map((guess, i) => <GuessRow key={i} code={guess} />)}
          </React.Fragment>
        }
      </Grid>
    </Container>
  )
}