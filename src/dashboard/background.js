import { CURRENT_DAY, GET_CARDS_FOR_DAY } from '../gql/queries'
import { useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import React from 'react'

export default function Background() {
  const theme = useTheme()
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data?.currentDay.day || 0
  const { data, loading } = useQuery(GET_CARDS_FOR_DAY, { variables: { 'daysBack': 1, 'currentDay': currentDay } })
  const backgroundCount = Number(localStorage.backgroundCount || 0)
  const card = data?.cardsForDay[backgroundCount % data?.cardsForDay.length]
  localStorage.backgroundCount = backgroundCount + 1

  return <div style={{
    zIndex: -100,
    position: 'fixed',
    backgroundImage: loading ? '' : `url("${card.backgroundImage}")`,
    width: '100vw',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    opacity: theme.palette.mode === 'dark' ? 0.08 : 0.3,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }} />
}