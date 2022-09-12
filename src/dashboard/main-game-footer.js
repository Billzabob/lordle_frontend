import * as React from 'react'
import { useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { GET_CARDS_FOR_DAY } from '../gql/queries'

export default function MainGameFooter() {
  const { data, loading } = useQuery(GET_CARDS_FOR_DAY, { variables: { 'daysBack': 1 } })
  if (loading) return null
  const text = data.cardsForDay.length > 1 ? "Yesterday's answers were: " : "Yesterday's answer was: "

  return (
    <Typography variant='h6' sx={{ textAlign: 'center', mt: 3 }}>
      {text + data.cardsForDay.map(c => c.name).join(', ')}
    </Typography>
  )
}