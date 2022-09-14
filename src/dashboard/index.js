import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { darkMode, settingsDialogOpen, statsDialogOpen } from '../reactive-vars'
import { mainListItems } from './list-items'
import { SettingsDialog, StatsChartDialog } from '../dialogs'
import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import AppBar from './app-bar'
import BarChartIcon from '@mui/icons-material/BarChart'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Countdown from './countdown'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import DrawerHeader from './drawer-header'
import GuessCounter from './guess-counter'
import GuessingGame from '../guessing-game/GuessingGame'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Logo from '../Logo'
import Main from './main'
import MainGameFooter from './main-game-footer'
import MainGameTitle from './main-game-title'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import Toolbar from '@mui/material/Toolbar'


const drawerWidth = 240

function DashboardContent() {
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
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SettingsDialog />
      <StatsChartDialog />
      <Box sx={{ display: 'flex' }}>
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Box mt={1} sx={{ flexGrow: 1 }}>
              <a href='https://www.lordle.gg'>
                <Logo/>
              </a>
            </Box>
            <IconButton color='inherit' sx={{ mr: 1 }} onClick={() => statsDialogOpen(true)}>
              <BarChartIcon />
            </IconButton>
            <IconButton color='inherit' onClick={() => settingsDialogOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {mdTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {mainListItems}
          </List>
        </Drawer>
        <Main open={open} drawerWidth={drawerWidth} sx={{overflow: 'auto'}}>
          <DrawerHeader />
          <MainGameTitle />
          <Countdown />
          <GuessingGame />
          <GuessCounter />
          <MainGameFooter />
        </Main>
      </Box>
    </ThemeProvider>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}