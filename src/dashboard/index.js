import { Box, Container } from '@mui/material'
import { SettingsDialog } from '../dialogs/settings'
import CssBaseline from '@mui/material/CssBaseline'
import GuessCounter from '../guessing-game/GuessCounter'
import GuessingGame from '../guessing-game/GuessingGame'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import MyDrawer from './drawer'
import React from 'react'
// import Streak from '../guessing-game/Streak'
import Themer from './themer'
import YesterdaysCard from '../guessing-game/YesterdaysCard'

export default function Dashboard() {

  return (
    <Themer>
      <CssBaseline />
      <SettingsDialog />
      {/* <StatsChartDialog /> */}
      <MyDrawer />
      <Box sx={{ display: 'flex', mb: 4 }}>
        <MyAppBar />
        <Container sx={{ mt: 11 }}>
          <MainGameTitle />
          {/* <Streak /> */}
          <GuessingGame />
          <GuessCounter />
          <YesterdaysCard />
        </Container>
      </Box>
    </Themer>
  )
}
