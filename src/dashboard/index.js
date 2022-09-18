import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { darkMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import React, {useState} from 'react'
import Countdown from './countdown'
import CssBaseline from '@mui/material/CssBaseline'
import GuessingGame from '../guessing-game/GuessingGame'
import MainGameTitle from './main-game-title'
import MyAppBar from './app-bar'
import { Box, Container } from '@mui/material'
import { SettingsDialog } from '../dialogs/settings'
import MyDrawer from './drawer'
import YesterdaysCard from './yesterdays-card'
import GuessCounter from './guess-counter'
import GuessInput from '../guessing-game/GuessInput'


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

  const [guesses, setGuesses] = useState([])

  const setGuess = (guess) => {
    setGuesses([guess, ...guesses])
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SettingsDialog />
      {/* <StatsChartDialog /> */}
      <MyDrawer/>
      <Box sx={{ display: 'flex', mb: 4 }}>
        <MyAppBar/>
        <Container sx={{mt: 9}}>
          <MainGameTitle />
          <Countdown />
          <GuessInput setGuess={setGuess} guesses={guesses} />
          <GuessingGame guesses={guesses} />
          <GuessCounter />
          <YesterdaysCard />
        </Container>
      </Box>
    </ThemeProvider>
  )
}