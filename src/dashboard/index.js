import { Box, Container } from '@mui/material'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { darkMode } from '../reactive-vars'
import { makeVar, useReactiveVar } from '@apollo/client'
import { SettingsDialog } from '../dialogs/settings'
import { useLocalStorage } from '../util'
import CssBaseline from '@mui/material/CssBaseline'
import GuessCounter from './guess-counter'
import GuessingGame from '../guessing-game/GuessingGame'
import GuessingGameHeader from '../guessing-game/GuessingGameHeader'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import MyDrawer from './drawer'
import React from 'react'
import YesterdaysCard from './yesterdays-card'

export const correct = makeVar(false)

export default function Dashboard() {
  const isDarkMode = useReactiveVar(darkMode)
  let mdTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#413331',
      },
      secondary: {
        main: '#C2A052',
      },
    },
  })
  mdTheme = responsiveFontSizes(mdTheme)

  const [guesses, setGuesses] = useLocalStorage('guesses', [])

  const setGuess = (guess) => {
    setGuesses([guess, ...guesses])
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SettingsDialog />
      {/* <StatsChartDialog /> */}
      <MyDrawer />
      <Box sx={{ display: 'flex', mb: 4 }}>
        <MyAppBar />
        <Container sx={{ mt: 9 }}>
          <MainGameTitle />
          <GuessingGameHeader guesses={guesses} setGuess={setGuess} />
          <GuessingGame guesses={guesses} />
          <GuessCounter />
          <YesterdaysCard />
        </Container>
      </Box>
    </ThemeProvider>
  )
}