import React from 'react'
import { useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { GET_CARDS_FOR_DAY } from '../gql/queries'
import { Box, Skeleton } from '@mui/material'

export default React.forwardRef((_, ref) => {
  const { data, loading } = useQuery(GET_CARDS_FOR_DAY, { variables: { 'daysBack': 1 } })

  return (
    <Box ref={ref} display='flex' justifyContent='center'>
      <Typography variant='h6' sx={{ my: 2, textAlign: 'center' }}>
        {loading ? <Skeleton width={400} /> : content(data)}
      </Typography>
    </Box>
  )
})

function content(data) {
  const text = data.cardsForDay.length > 1 ? "Yesterday's answers were: " : "Yesterday's answer was: "
  return text + data.cardsForDay.map(c => c.name).join(', ')
}