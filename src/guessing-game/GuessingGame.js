import GuessInput from './GuessInput'
import GuessRow from './GuessRow'
import GuessHeader from './GuessHeader'
import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'
import FlipMove from 'react-flip-move'
import GuessCounter from '../dashboard/guess-counter'
import MainGameFooter from '../dashboard/main-game-footer'

export default function GuessingGame() {
  const [guesses, setGuesses] = useState([])

  const setGuess = (guess) => {
    setGuesses([guess, ...guesses])
  }

  const guessRows = guesses.map(guess => <div key={guess}><GuessRow code={guess}/></div>)
  const footers = [<GuessCounter key='guessCounter'/>, <MainGameFooter key='mainGameFooter'/>]

  return (
    <>
      <GuessInput setGuess={setGuess} guesses={guesses} />
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {guesses.length > 0 &&
        (<Grid container columns={12} spacing={2} minWidth={'868px'}>
          <GuessHeader />
        </Grid>)
        }
        <FlipMove>
          {[...guessRows, ...footers]}
        </FlipMove>
      </Container>
    </>
  )
}