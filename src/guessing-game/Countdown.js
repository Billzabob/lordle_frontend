import { Box, Skeleton, Typography } from '@mui/material'
import { COUNTDOWN_QUERY } from '../gql/queries'
import { StyledButton } from '../dashboard/styled-components'
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

export default function Countdown() {
  const { data, loading } = useQuery(COUNTDOWN_QUERY, { fetchPolicy: 'no-cache' })
  const [timeLeft, setTimeLeft] = useState(null)

  timeLeft === null && data && setTimeLeft(3)

  useEffect(() => {
    const timer = timeLeft > 0 && setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  })

  // This could be much cleaner with a time library
  const timeString = (new Date(timeLeft * 1000)).toISOString().substring(11, 19)

  return (
    <Box display='flex' justifyContent='center'>
      {
        timeLeft === 0
          ? <StyledButton href='/' sx={{ my: 1.25 }} variant='contained'>Refresh</StyledButton>
          : <Typography variant='h6' sx={{ my: 1.5 }}>
            {loading ? <Skeleton width={400} /> : 'Next challenge in: ' + timeString}
          </Typography>
      }
    </Box>
  )
}