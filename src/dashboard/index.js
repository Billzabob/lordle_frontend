import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { darkMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import Countdown from './countdown'
import CssBaseline from '@mui/material/CssBaseline'
import GuessCounter from './guess-counter'
import GuessingGame from '../guessing-game/GuessingGame'
import MainGameFooter from './main-game-footer'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import { Box, Container } from '@mui/material'
import { SettingsDialog } from '../dialogs/settings'


export default function Dashboard() {
  const isDarkMode = useReactiveVar(darkMode)
  let mdTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2E2321',
      },
      secondary: {
        main: '#C2A052',
      },
    },
  })
  mdTheme = responsiveFontSizes(mdTheme)

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SettingsDialog />
      {/* <StatsChartDialog /> */}
      <Box sx={{ display: 'flex' }}>
        <MyAppBar/>
        <Container sx={{mt: 12}}>
          <MainGameTitle />
          <Countdown />
          <GuessingGame />
          <GuessCounter />
          <MainGameFooter />
        </Container>
      </Box>
    </ThemeProvider>
  )
}