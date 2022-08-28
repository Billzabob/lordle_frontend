import GuessInput from './GuessInput';
import GuessRow from './GuessRow';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import React, { useState } from 'react';

export default function GuessingGame() {
  const [guess, setGuess] = useState('01IO012')

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <GuessInput setGuess={setGuess} />
        <GuessRow code={guess}/>
      </Stack>
    </Container>
)
}