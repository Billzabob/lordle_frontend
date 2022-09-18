import GuessRow from './GuessRow'
import GuessHeader from './GuessHeader'
import React from 'react'
import { Container, Grid } from '@mui/material'
import FlipMove from 'react-flip-move'

export default function GuessingGame({ guesses }) {

  const guessRows = guesses.map(guess => <div key={guess}><GuessRow code={guess} /></div>)

  return (
    <>
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {guesses.length > 0 &&
          (<Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
          </Grid>)
        }
        <FlipMove>
          {guessRows}
        </FlipMove>
      </Container>
    </>
  )
}