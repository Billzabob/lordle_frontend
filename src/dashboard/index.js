import { Box, Container } from '@mui/material'
import { CORRECT_ANSWERS, GET_CARDS_FOR_DAY, VOICE_CORRECT_ANSWERS, VOICE_GET_CARDS_FOR_DAY } from '../gql/queries'
import { page } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import AboutDialog from '../dialogs/about'
import Background from './background'
import CssBaseline from '@mui/material/CssBaseline'
import GuessCounter from '../guessing-game/GuessCounter'
import GuessingGame from '../guessing-game/GuessingGame'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import MyDrawer from './drawer'
import React from 'react'
import SettingsDialog from '../dialogs/settings'
import Themer from './themer'
import VoiceGame from '../voice-game/VoiceGame'
import YesterdaysCard from '../guessing-game/YesterdaysCard'

export default function Dashboard() {
  const selectedPage = useReactiveVar(page)

  const classic = <>
    <MainGameTitle title="Guess today's Legends of Runeterra card" />
    <GuessingGame />
    <GuessCounter query={CORRECT_ANSWERS} />
    <YesterdaysCard query={GET_CARDS_FOR_DAY} />
  </>

  const quote = <>
    <MainGameTitle title="Guess today's Legends of Runeterra quote" />
    <VoiceGame/>
    <GuessCounter query={VOICE_CORRECT_ANSWERS} />
    <YesterdaysCard query={VOICE_GET_CARDS_FOR_DAY} />
  </>

  return (
    <Themer>
      <CssBaseline />
      <SettingsDialog />
      <AboutDialog />
      <MyDrawer />
      <Box sx={{ display: 'flex', mb: 4 }}>
        {selectedPage === 'classic' && <Background query={GET_CARDS_FOR_DAY} />}
        {selectedPage === 'quote' && <Background query={VOICE_GET_CARDS_FOR_DAY} />}
        <MyAppBar />
        <Container sx={{ mt: 11 }} disableGutters>
          {selectedPage === 'classic' && classic}
          {selectedPage === 'quote' && quote}
        </Container>
      </Box>
    </Themer>
  )
}
