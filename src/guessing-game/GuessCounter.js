import React from 'react'
import { useQuery } from '@apollo/client'
import { Box, Skeleton, Typography } from '@mui/material'

export default function GuessCounter({ query }) {
  const { data, loading } = useQuery(query, { fetchPolicy: 'no-cache' })
  return (
    <Box display='flex' justifyContent='center'>
      <Typography variant='h6' sx={{ mt: 0 }}>
        {loading
          ? <Skeleton width={400} />
          : data.correctAnswers + (data.correctAnswers === 1 ? ' person' : ' people') + ' already found out!'}
      </Typography>
    </Box>
  )
}