import * as React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../Logo'
import SettingsIcon from '@mui/icons-material/Settings'
import { settingsDialogOpen } from '../reactive-vars'
import { drawerOpen } from './drawer'
import pages from './pages'

export default function MyAppBar() {
  return (
    <AppBar component='nav'>
      <Box mx={3}>
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              onClick={() => drawerOpen(true)}
              color='inherit'
            >
              <MenuIcon/>
            </IconButton>
          </Box>

          <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }}}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ mx: 1, color: 'white', display: 'block' }}
              >
                <Typography variant='h6'>
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

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