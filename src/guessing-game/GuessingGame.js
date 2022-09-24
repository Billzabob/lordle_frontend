import { Container, Grid } from '@mui/material'
import { CURRENT_DAY } from '../gql/queries'
import { useQuery } from '@apollo/client'
import FlipMove from 'react-flip-move'
import GuessHeader from './GuessHeader'
import GuessingGameHeader from './GuessingGameHeader'
import GuessRow from './GuessRow'
import React, { useEffect, useState } from 'react'

export default function GuessingGame() {
  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const currentDay = data?.currentDay?.day
  const [guessCodes, setGuessCodes] = useState(() => getStoredCodes(currentDay))
  useEffect(() => setStoredCodes(currentDay, guessCodes))

  if (!guessCodes && currentDay) setGuessCodes(getStoredCodes(currentDay) || [])

  const codes = guessCodes || []

  const guessRows = codes.map(guess =>
    <div key={guess}>
      <GuessRow code={guess} animate={!getStoredCodes(currentDay).includes(guess)} />
    </div>
  )

  return (
    <>
      <GuessingGameHeader
        guesses={codes}
        setGuess={(guess) => setGuessCodes([guess, ...guessCodes])}
      />
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {guessRows.length > 0 &&
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

function getStoredCodes(currentDay) {
  const item = window.localStorage.getItem('guesses' + currentDay)
  return item ? JSON.parse(item) : item
}

function setStoredCodes(currentDay, codes) {
  if (currentDay && codes)
    window.localStorage.setItem('guesses' + currentDay, JSON.stringify(codes))
}
