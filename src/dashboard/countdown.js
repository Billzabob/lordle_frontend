import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import { COUNTDOWN_QUERY } from '../gql/queries'

export default function Countdown() {
  const { data } = useQuery(COUNTDOWN_QUERY)
  const [timeLeft, setTimeLeft] = useState(null)

  if (!timeLeft && data) setTimeLeft(data.nextCardTimeSeconds)

  useEffect(() => {
    const timer = timeLeft > 0 && setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  })

  // This could be much cleaner with a time library
  const timeString = timeLeft ? (new Date(timeLeft * 1000)).toISOString().substring(11, 19) : ''

  return (
    <Typography variant='h6' sx={{textAlign: 'center', mt: 3}}>
      Next LoRdle: {timeString}
    </Typography>
  )
}