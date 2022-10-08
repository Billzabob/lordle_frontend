import { Box, Container } from '@mui/material'
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
import YesterdaysCard from '../guessing-game/YesterdaysCard'
import VoiceGame from '../voice-game/VoiceGame'

export default function Dashboard() {
  const selectedPage = useReactiveVar(page)

  const classic = <>
    <MainGameTitle />
    <GuessingGame />
    <GuessCounter />
    <YesterdaysCard />
  </>

  const quote = <VoiceGame/>

  return (
    <Themer>
      <CssBaseline />
      <SettingsDialog />
      <AboutDialog />
      <MyDrawer />
      <Box sx={{ display: 'flex', mb: 4 }}>
        <Background />
        <MyAppBar />
        <Container sx={{ mt: 11 }} disableGutters>
          {selectedPage === 'classic' && classic}
          {selectedPage === 'quote' && quote}
        </Container>
      </Box>
    </Themer>
  )
}
