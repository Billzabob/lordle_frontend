import React from 'react'
import { useQuery } from '@apollo/client'
import { CORRECT_ANSWERS } from '../gql/queries'
import { Box, Skeleton, Typography } from '@mui/material'

export default React.forwardRef((_, ref) => {
  const { data, loading } = useQuery(CORRECT_ANSWERS, { fetchPolicy: 'no-cache' })
  return (
    <Box ref={ref} display='flex' justifyContent='center'>
      <Typography variant='h6' sx={{ mt: 0 }}>
        {loading
          ? <Skeleton width={400} />
          : data.correctAnswers + (data.correctAnswers === 1 ? ' person' : ' people') + ' already found out!'}
      </Typography>
    </Box>
  )
})