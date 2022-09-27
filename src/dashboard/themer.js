import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { darkMode, highContrastMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import React from 'react'

export default function Themer({ children }) {
  const isDarkMode = useReactiveVar(darkMode)
  const isHighContrastMode = useReactiveVar(highContrastMode)

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

  const highContrastTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#413331',
      },
      secondary: {
        main: '#C2A052',
      },
      success: {
        main: '#D7733A',
      },
      error: {
        main: '#8FB3F6',
      },
      tonalOffset: 0.08
    }
  })

  const theme = isHighContrastMode ? highContrastTheme : mdTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}