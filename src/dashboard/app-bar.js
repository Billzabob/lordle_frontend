import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material'
import { drawerOpen, settingsDialogOpen } from '../reactive-vars'
import { StyledButton } from '../dashboard/styled-components'
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
    <Logo sx={{ height: 25, display: { xs: 'none', md: 'flex' }, mx: 1 }} />

    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
      {pages.map(({ name }) => (
        <StyledButton
          variant='text'
          key={name}
          color='secondary'
          sx={{ mx: 1 }}
        >
          <Typography fontSize={14} fontWeight='bold'>
            {name}
          </Typography>
        </StyledButton>
      ))}
    </Box>
  </>
)

export default function MyAppBar() {
  return (
    <AppBar component='nav'>
      <Box mx={3} my={1}>
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