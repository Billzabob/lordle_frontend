import { Box, Container, Grid } from '@mui/material'
import { classicShareText, updateStats, useCompactMode } from '../util'
import { CURRENT_DAY } from '../gql/queries'
import { languageSetting, loadingBar, resultsDialogState } from '../reactive-vars'
import { useQuery, useReactiveVar } from '@apollo/client'
import FlipMove from 'react-flip-move'
import GuessHeader from './GuessHeader'
import GuessingGameHeader from './GuessingGameHeader'
import GuessRow from './GuessRow'
import LoadingBar from './LoadingBar'
import React, { useEffect, useReducer, useState } from 'react'
import StatsChartDialog from '../dialogs/stats-chart'
import WinDialog from './WinDialog'

export default function GuessingGame() {
  const [results, dispatch] = useReducer(reducer, [])
  const correct = results.some(r => r?.correct)
  const numGuesses = results.length
  const language = useReactiveVar(languageSetting)
  const loading = useReactiveVar(loadingBar)
  const small = useCompactMode()

  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'network-only' })
  const currentDay = data?.currentDay?.day

  useEffect(() => {
    if (correct && Number(localStorage.currentDay) !== currentDay) updateStats(currentDay, numGuesses, '')
  }, [correct, currentDay, numGuesses])

  const [guess, setGuess] = useState()
  const storedCodes = getStoredCodes(currentDay) || []

  const codes = (guess && !storedCodes.includes(guess)) ? [...storedCodes, guess] : storedCodes

  useEffect(() => setStoredCodes(currentDay, codes), [currentDay, codes])

  const guessRows = codes.map((guess, i) =>
    <div key={guess}>
      <GuessRow
        language={language}
        code={guess}
        setResult={dispatch}
        index={i}
        animate={!storedCodes.includes(guess)}
      />
    </div>
  )

  return (
    <>
      <StatsChartDialog currentDay={currentDay} prefix='' title='Classic Stats' />
      <GuessingGameHeader
        dialogState={resultsDialogState}
        guesses={codes}
        setGuess={setGuess}
        correct={correct}
        sx={{ mt: 2 }}
      />
      <WinDialog results={results} dialogState={resultsDialogState} shareText={classicShareText} />
      <LoadingBar loading={loading === 'loading'}/>
      <Container maxWidth='md' sx={{ overflow: 'auto', p: 2 }}>
        {guessRows.length > 0 &&
          (
            <Box display='flex' justifyContent='center' width={small ? '100%' : '852px'}>
              <Grid container spacing={small ? 1 : 2} >
                <GuessHeader />
              </Grid>
            </Box>
          )
        }
        <FlipMove enterAnimation='accordionVertical'>
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
  if (currentDay !== undefined)
    window.localStorage.setItem('guesses' + currentDay, JSON.stringify(codes))
}
