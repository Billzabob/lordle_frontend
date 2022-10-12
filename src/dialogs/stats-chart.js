import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { statsDialogOpen } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import React from 'react'

export default function StatsChartDialog({ currentDay, prefix, title }) {
  const open = useReactiveVar(statsDialogOpen)
  const gamesWon = Number(localStorage.getItem(prefix + 'gamesWon') || 0)
  const guessCount = Number(localStorage.getItem(prefix + 'guessCount') || 0)
  const averageGuesses = gamesWon === 0 ? 0 : (guessCount / gamesWon).toFixed(1)
  const streak = currentStreak(currentDay, prefix)
  const maxStreak = Number(localStorage.getItem(prefix + 'maxStreak') || 0)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={() => statsDialogOpen(false)} open={open}>
      <DialogTitle variant='h4' textAlign='center'>{title}</DialogTitle>
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

function currentStreak(currentDay, prefix) {
  if (currentDay === Number(localStorage.getItem(prefix + 'currentDay')) || currentDay - 1 === Number(localStorage.getItem(prefix + 'currentDay')))
    return localStorage.getItem(prefix + 'currentStreak') || 0
  else
    return 0
}