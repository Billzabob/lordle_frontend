import { Box } from "@mui/material"
import FlipMove from 'react-flip-move'
import React, { useEffect, useReducer, useState } from "react"
import VoiceGuess from "./VoiceGuess"
import { CURRENT_DAY } from "../gql/queries"
import { useQuery, useReactiveVar } from "@apollo/client"
import { languageSetting, loadingBar, voiceResultsDialogState } from "../reactive-vars"
import WinDialog from "../guessing-game/WinDialog"
import GuessingGameHeader from "../guessing-game/GuessingGameHeader"
import { updateStats, voiceShareText } from "../util"
import SoundButton from "./SoundButton"
import StatsChartDialog from "../dialogs/stats-chart"
import LoadingBar from "../guessing-game/LoadingBar"

export default function VoiceGame() {
  const [results, dispatch] = useReducer(reducer, [])
  const correct = results.some(r => r?.correct)
  const numGuesses = results.length
  const { data } = useQuery(CURRENT_DAY)
  const currentDay = data?.currentDay?.day
  const storedCodes = getStoredCodes(currentDay) || []
  const [guess, setGuess] = useState()
  const codes = (guess && !storedCodes.includes(guess)) ? [...storedCodes, guess] : storedCodes
  const language = useReactiveVar(languageSetting)
  const loading = useReactiveVar(loadingBar)
  useEffect(() => setStoredCodes(currentDay, codes), [currentDay, codes])

  useEffect(() => {
    if (correct && Number(localStorage.voicecurrentDay) !== currentDay) updateStats(currentDay, numGuesses, 'voice')
  }, [correct, currentDay, numGuesses])

  const guessRows = codes.map((guess, i) =>
    <div key={guess}>
      <VoiceGuess
        index={i}
        setResult={dispatch}
        animate={!storedCodes.includes(guess)}
        code={guess}
        language={language}
      />
    </div>
  )

  return (
    <Box>
      <WinDialog results={results} dialogState={voiceResultsDialogState} shareText={voiceShareText} />
      <LoadingBar loading={loading === 'loading'}/>
      <SoundButton/>
      <StatsChartDialog currentDay={currentDay} prefix='voice' title='Voice Stats' />
      <GuessingGameHeader
        dialogState={voiceResultsDialogState}
        guesses={codes}
        setGuess={setGuess}
        correct={correct}
        sx={{mt: -3}}
      />
      <Box display='flex' alignItems='center' flexDirection='column' sx={{ mt: 4, mb: 1, zIndex: 1000 }}>
        <FlipMove enterAnimation='accordionVertical'>
          {guessRows.reverse()}
        </FlipMove>
      </Box>
    </Box>
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
  const item = window.localStorage.getItem('voiceGuesses' + currentDay)
  return item ? JSON.parse(item) : item
}

function setStoredCodes(currentDay, codes) {
  if (currentDay !== undefined)
    window.localStorage.setItem('voiceGuesses' + currentDay, JSON.stringify(codes))
}