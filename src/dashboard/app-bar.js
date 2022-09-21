import { AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material'
import { drawerOpen, settingsDialogOpen } from '../reactive-vars'
import Logo from '../Logo'
import MenuIcon from '@mui/icons-material/Menu'
import pages from './pages'
import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings'

const smallLayout = (
  <>
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        onClick={() => drawerOpen(true)}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
    </Box>

    <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 } }} />
  </>
)

const largeLayout = (
  <>
    <Logo sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }} />

    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
      {pages.map(({ name }) => (
        <Button
          key={name}
          sx={{ mx: 1, color: 'white', display: 'block' }}
        >
          <Typography textTransform='capitalize' variant='h6'>
            {name}
          </Typography>
        </Button>
      ))}
    </Box>
  </>
)

export default function MyAppBar() {
  return (
    <AppBar component='nav'>
      <Box mx={3}>
        <Toolbar disableGutters>
          {smallLayout}
          {largeLayout}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton color='inherit' onClick={() => settingsDialogOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}