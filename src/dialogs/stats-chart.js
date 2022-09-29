import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { statsDialogOpen } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import React from 'react'

export default function StatsChartDialog({ currentDay }) {
  const open = useReactiveVar(statsDialogOpen)
  const gamesWon = Number(localStorage.gamesWon || 0)
  const guessCount = Number(localStorage.guessCount || 0)
  const averageGuesses = gamesWon === 0 ? 0 : (guessCount / gamesWon).toFixed(1)
  const streak = currentStreak(currentDay)
  const maxStreak = Number(localStorage.maxStreak || 0)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={() => statsDialogOpen(false)} open={open}>
      <DialogTitle variant='h4' textAlign='center'>Stats</DialogTitle>
      <DialogContent>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          {'Games Won: ' + gamesWon}
        </Typography>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          {'Average Guesses: ' + averageGuesses}
        </Typography>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          {'Current Streak: ' + streak}
        </Typography>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          {'Max Streak: ' + maxStreak}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2, textAlign: 'center' }}>
          Note: Stats don't sync across devices
      </Typography>
    </DialogContent>
    </Dialog >
  )
}

function currentStreak(currentDay) {
  if (currentDay === Number(localStorage.currentDay) || currentDay - 1 === Number(localStorage.currentDay))
    return localStorage.currentStreak || 0
  else
    return 0
}