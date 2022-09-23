import { Container, Grid } from '@mui/material'
import { useLocalStorage } from '../util'
import FlipMove from 'react-flip-move'
import GuessHeader from './GuessHeader'
import GuessingGameHeader from './GuessingGameHeader'
import GuessRow from './GuessRow'
import React from 'react'

export default function GuessingGame() {
  const [guessCodes, setGuessCodes] = useLocalStorage('guesses', [])
  const setGuessCode = (guess) => setGuessCodes([guess, ...guessCodes])

  const guessRows = guessCodes.map(guess =>
    <div key={guess}>
      <GuessRow code={guess} />
    </div>
  )

  return (
    <>
      <GuessingGameHeader guesses={guessCodes} setGuess={setGuessCode} />
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {guessCodes.length > 0 &&
          (<Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
          </Grid>)
        }
        <FlipMove enterAnimation="fade">
          {guessRows}
        </FlipMove>
      </Container>
    </>
  )
}
