import { Box, Card, CardMedia, Grid } from "@mui/material"
import { CHECK_VOICE_GUESS } from "../gql/queries/voice-guess"
import { CURRENT_DAY } from "../gql/queries"
import { useQuery, useReactiveVar } from "@apollo/client"
import CardFlip from "../guessing-game/CardFlip"
import React, { useEffect, useState } from "react"
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { darkMode, voiceResultsDialogState } from "../reactive-vars"

const getColor = (palette, correct, isDark) => {
  if (isDark && correct) return palette.success.dark
  else if (!isDark && correct) return palette.success.light
  else if (isDark && !correct) return palette.error.dark
  else if (!isDark && !correct) return palette.error.light
}

export default React.memo(function VoiceGuess({ code, language, animate, setResult, index }) {
  const isDark = useReactiveVar(darkMode)
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { loading, data } = useQuery(CHECK_VOICE_GUESS, { variables: { code, language, day: currentDay } })
  const [loaded, setLoaded] = useState(false)
  const [doneAnimating, setDoneAnimating] = useState(false)
  const guess = data?.guessVoice

  useEffect(() => {
    if (!loading) {
      const correct = data.guessVoice.correct
      if (animate && doneAnimating) {
        setResult({ index, result: guess })
        if (voiceResultsDialogState() === 'incorrect' && correct) voiceResultsDialogState('open')
      } else if (!animate) {
        setResult({ index, result: guess })
        if (voiceResultsDialogState() === 'incorrect' && correct) voiceResultsDialogState('closed')
      }
    }
  })

  return (
    <Box sx={{ width: 350, mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardFlip delay={0} animate={animate} run={!loading && loaded}>
            <img
              src={data?.guessVoice.image}
              alt={data?.guessVoice.name || ''}
              onLoad={() => setLoaded(true)}
              style={{ width: '100%', aspectRatio: 0.664, filter: 'drop-shadow(5px 5px 5px black)' }}
            />
          </CardFlip>
        </Grid>
        <Grid item xs={6}>
          <CardFlip onEntered={() => setDoneAnimating(true)} delay={350} animate={animate} run={!loading && loaded}>
            <Card variant='outlined'>
              <CardMedia
                sx={{
                  bgcolor: ({ palette }) => getColor(palette, data?.guessVoice.correct, isDark),
                  width: '100%',
                  aspectRatio: '0.664',
                }}
              >
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
                  {data?.guessVoice.correct ?
                    <CheckIcon htmlColor='white' style={{ fontSize: 100 }} /> :
                    <ClearIcon htmlColor='black' style={{ fontSize: 100 }} />
                  }
                </Box>
              </CardMedia>
            </Card>
          </CardFlip>
        </Grid>
      </Grid>
    </Box>
  )
}, (a, b) => a.code === b.code && a.language === b.language)