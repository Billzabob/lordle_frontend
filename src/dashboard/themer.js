import { useReactiveVar } from '@apollo/client'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import React from 'react'
import { darkMode } from '../reactive-vars'

export default function Themer({children}) {
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

  return <ThemeProvider theme={mdTheme}>{children}</ThemeProvider>
}