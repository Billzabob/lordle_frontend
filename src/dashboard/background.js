import { CURRENT_DAY } from '../gql/queries'
import { useQuery } from '@apollo/client'
import React from 'react'

export default function Background({query}) {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data?.currentDay.day || 0
  const { data, loading } = useQuery(query, { variables: { day: currentDay - 1 } })
  const backgroundCount = Number(localStorage.backgroundCount || 0)
  const card = data?.cardsForDay[backgroundCount % data?.cardsForDay.length]
  localStorage.backgroundCount = backgroundCount + 1

  return <div style={{
    margin: '70px 0 0 0',
    zIndex: -100,
    position: 'fixed',
    backgroundImage: loading ? '' : `url("${card.backgroundImage}")`,
    width: '100vw',
    height: 'calc(100vh - 70px)',
    backgroundRepeat: 'no-repeat',
    opacity: 0.3,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }} />
}