import { Box, Container } from '@mui/material'
import { useApolloClient, useQuery } from '@apollo/client'
import { GUESSES } from '../gql/queries'
import { SettingsDialog } from '../dialogs/settings'
import CacheResetter from './cache-resetter'
import CssBaseline from '@mui/material/CssBaseline'
import GuessCounter from '../guessing-game/GuessCounter'
import GuessingGame from '../guessing-game/GuessingGame'
import GuessingGameHeader from '../guessing-game/GuessingGameHeader'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import MyDrawer from './drawer'
import React from 'react'
import Themer from './themer'
import YesterdaysCard from '../guessing-game/YesterdaysCard'

export default function Dashboard() {
  const client = useApolloClient()
  const { data } = useQuery(GUESSES, { fetchPolicy: 'cache-only' })
  const guesses = data?.guesses || []
  const guessCodes = guesses.map(g => g.cardCode)

  return (
    <Themer>
      <CacheResetter />
      <CssBaseline />
      <SettingsDialog />
      {/* <StatsChartDialog /> */}
      <MyDrawer />
      <Box sx={{ display: 'flex', mb: 4 }}>
        <MyAppBar />
        <Container sx={{ mt: 9 }}>
          <MainGameTitle />
          <GuessingGameHeader guesses={guessCodes} setGuess={setGuess(client, guesses)} />
          <GuessingGame guesses={guessCodes} />
          <GuessCounter />
          <YesterdaysCard />
        </Container>
      </Box>
    </Themer>
  )
}

function setGuess(client, guesses) {
  return (guess) => {
    client.writeQuery({
      query: GUESSES,
      data: {
        guesses: [
          {
            __typename: 'Guesses',
            cardCode: guess
          }, ...guesses
        ]
      },
    })
  }
}