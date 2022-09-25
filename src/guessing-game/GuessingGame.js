import { Container, Grid } from '@mui/material'
import { CURRENT_DAY } from '../gql/queries'
import { useQuery } from '@apollo/client'
import FlipMove from 'react-flip-move'
import GuessHeader from './GuessHeader'
import GuessingGameHeader from './GuessingGameHeader'
import GuessRow from './GuessRow'
import React, { useReducer, useState } from 'react'
import WinDialog from './WinDialog'

export default function GuessingGame() {
  const [results, dispatch] = useReducer(reducer, [])

  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const currentDay = data?.currentDay?.day

  const [guess, setGuess] = useState()
  const storedCodes = getStoredCodes(currentDay) || []

  const codes = (guess && !storedCodes.includes(guess)) ? [...storedCodes, guess] : storedCodes

  const guessRows = codes.map((guess, i) =>
    <div key={guess}>
      <GuessRow
        code={guess}
        setResult={dispatch}
        index={i}
        animate={!storedCodes.includes(guess)}
      />
    </div>
  )

  setStoredCodes(currentDay, codes)

  return (
    <>
      <GuessingGameHeader
        guesses={codes}
        setGuess={setGuess}
        correct={results.some(r => r.correct)}
      />
      <WinDialog results={results}/>
      <Container maxWidth='md' sx={{ overflow: 'auto' }}>
        {guessRows.length > 0 &&
          (<Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
          </Grid>)
        }
        <FlipMove enterAnimation="fade">
          {guessRows.reverse()}
        </FlipMove>
      </Container>
    </>
  )
}

function reducer(results, { index, result }) {
  const newLength = Math.max(index + 1, results.length)
  const newResults = Array(newLength).fill(null)
  results.forEach((v, i) => newResults[i] = v)
  newResults[index] = result
  return newResults
}

function getStoredCodes(currentDay) {
  const item = window.localStorage.getItem('guesses' + currentDay)
  return item ? JSON.parse(item) : item
}

function setStoredCodes(currentDay, codes) {
  if (currentDay)
    window.localStorage.setItem('guesses' + currentDay, JSON.stringify(codes))
}
