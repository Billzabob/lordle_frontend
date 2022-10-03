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
        main: '#C2A052',
      },
      secondary: {
        main: '#413331',
      },
    },
  })

  mdTheme = responsiveFontSizes(mdTheme)


  let highContrastTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#C2A052',
      },
      secondary: {
        main: '#413331',
      },
      success: {
        main: '#D7733A',
      },
      error: {
        main: '#8FB3F6',
      },
      warning: {
        main: '#B2749C',
      },
      tonalOffset: 0
    }
  })

  highContrastTheme = responsiveFontSizes(highContrastTheme)

  const theme = isHighContrastMode ? highContrastTheme : mdTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}