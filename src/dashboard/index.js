import { Box, Container } from '@mui/material'
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

export default function Dashboard() {

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
          <MainGameTitle />
          <GuessingGame />
          <GuessCounter />
          <YesterdaysCard />
        </Container>
      </Box>
    </Themer>
  )
}
