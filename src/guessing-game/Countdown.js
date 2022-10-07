import { Box, Skeleton, Typography } from '@mui/material'
import { COUNTDOWN_QUERY } from '../gql/queries'
import { StyledButton } from '../dashboard/styled-components'
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

export default function Countdown() {
  const { data, loading } = useQuery(COUNTDOWN_QUERY, { fetchPolicy: 'no-cache' })
  const [midnight, setMidnight] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)

  if (midnight === null && data) {
    const date = new Date()
    date.setSeconds(date.getSeconds() + data.nextCardTimeSeconds)
    setMidnight(date)
  }

  useEffect(() => {
    const startDate = new Date()
    const timeInSeconds = (midnight - startDate) / 1000
    const timer = setTimeout(() => setTimeLeft(timeInSeconds), 1000)
    return () => clearTimeout(timer)
  })

  // This could be much cleaner with a time library
  const timeString = (new Date(timeLeft * 1000)).toISOString().substring(11, 19)

  return (
    <Box display='flex' justifyContent='center'>
      {
        (timeLeft !== null && timeLeft <= 0)
          ? <StyledButton href='/' sx={{ my: 1.21875 }} variant='contained'>Refresh</StyledButton>
          : <Typography variant='h6' sx={{ my: 1.5 }}>
            {loading || timeLeft == null ? <Skeleton width={400} /> : 'Next challenge in: ' + timeString}
          </Typography>
      }
    </Box>
  )
}