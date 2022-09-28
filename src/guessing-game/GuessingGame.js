import { Container, Grid } from '@mui/material'
import { CURRENT_DAY } from '../gql/queries'
import { useQuery } from '@apollo/client'
import FlipMove from 'react-flip-move'
import GuessHeader from './GuessHeader'
import GuessingGameHeader from './GuessingGameHeader'
import GuessRow from './GuessRow'
import React, { useEffect, useReducer, useState } from 'react'
import StatsChartDialog from '../dialogs/stats-chart'
import WinDialog from './WinDialog'

export default function GuessingGame() {
  const [results, dispatch] = useReducer(reducer, [])
  const correct = results.some(r => r.correct)
  const numGuesses = results.length

  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'network-only' })
  const currentDay = data?.currentDay?.day

  useEffect(() => {
    if (correct && Number(localStorage.currentDay) !== currentDay) updateStats(currentDay, numGuesses)
  }, [correct, currentDay, numGuesses])

  const [guess, setGuess] = useState()
  const storedCodes = getStoredCodes(currentDay) || []

  const codes = (guess && !storedCodes.includes(guess)) ? [...storedCodes, guess] : storedCodes

  useEffect(() => setStoredCodes(currentDay, codes), [currentDay, codes])

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

  return (
    <>
      <StatsChartDialog currentDay={currentDay} />
      <GuessingGameHeader
        guesses={codes}
        setGuess={setGuess}
        correct={correct}
      />
      <WinDialog results={results} />
      <Container maxWidth='md' sx={{ overflow: 'auto', p: 2 }}>
        {guessRows.length > 0 &&
          (<Grid container columns={12} spacing={2} minWidth={'868px'}>
            <GuessHeader />
          </Grid>)
        }
        <FlipMove enterAnimation="accordionVertical">
          {guessRows.reverse()}
        </FlipMove>
      </Container>
    </>
  )
}

function reducer(results, { index, result }) {
  if (result === 'reset') return []
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
  if (currentDay !== undefined)
    window.localStorage.setItem('guesses' + currentDay, JSON.stringify(codes))
}

function updateStats(currentDay, numGuesses) {
  localStorage.gamesWon = Number(localStorage.gamesWon || 0) + 1
  localStorage.guessCount = Number(localStorage.guessCount || 0) + numGuesses

  if (localStorage.currentDay === undefined || Number(localStorage.currentDay) === currentDay - 1)
    localStorage.currentStreak = Number(localStorage.currentStreak || 0) + 1
  else
    localStorage.currentStreak = 1

  if (Number(localStorage.currentStreak) > Number(localStorage.maxStreak || 0))
    localStorage.maxStreak = localStorage.currentStreak

  localStorage.currentDay = currentDay
  console.log('Updating stats for day')
}
