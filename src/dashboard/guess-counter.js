import * as React from 'react'
import { useQuery } from '@apollo/client'
import { CORRECT_ANSWERS } from '../gql/queries'
import { Box, Skeleton, Typography } from '@mui/material'

export default function GuessCounter() {
  const { data, loading } = useQuery(CORRECT_ANSWERS)
  return (
    <Box display='flex' justifyContent='center'>
      <Typography variant='h6' sx={{ mt: 3 }}>
        {loading
          ? <Skeleton width={400} />
          : data.correctAnswers + (data.correctAnswers > 1 ? ' people' : ' person') + ' already found out!'}
      </Typography>
    </Box>
  )
}