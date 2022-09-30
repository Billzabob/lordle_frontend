import { Box, Skeleton } from '@mui/material'
import { CURRENT_DAY, GET_CARDS_FOR_DAY } from '../gql/queries'
import { languageSetting } from '../reactive-vars'
import { useQuery, useReactiveVar } from '@apollo/client'
import React from 'react'
import Typography from '@mui/material/Typography'

export default React.forwardRef((_, ref) => {
  const language = useReactiveVar(languageSetting)
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data?.currentDay.day || 0
  const { data, loading } = useQuery(GET_CARDS_FOR_DAY, { variables: { day: currentDay - 1, language } })

  return (
    !loading && data.cardsForDay.length === 0 ? null :
      <Box ref={ref} display='flex' justifyContent='center' sx={{ mx: 2 }}>
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