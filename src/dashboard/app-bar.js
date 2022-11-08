import { AppBar, Box, Toolbar, IconButton, Typography, Tooltip } from '@mui/material'
import { drawerOpen, settingsDialogOpen, statsDialogOpen } from '../reactive-vars'
import { StyledButton } from '../dashboard/styled-components'
import BarChartIcon from '@mui/icons-material/BarChart'
import Logo from '../Logo'
import MenuIcon from '@mui/icons-material/Menu'
import pages from './pages'
import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings'

const smallLayout = (
  <>
    <Box sx={{ mr: 4, flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        onClick={() => drawerOpen(true)}
        color='inherit'
        aria-label='Menu'
      >
        <MenuIcon />
      </IconButton>
    </Box>

    <Logo sx={{ justifyContent: 'center', display: { xs: 'flex', md: 'none', flexGrow: 1 } }} />
  </>
)

const largeLayout = (
  <>
    <Logo sx={{ height: 25, display: { xs: 'none', md: 'flex' }, mx: 1 }} />

    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map(({ name, link, disabled, onClick }) => {
        const button = <StyledButton
          variant='text'
          key={name}
          sx={{ mx: 1 }}
          href={link}
          onClick={onClick}
          disabled={disabled}
        >
          <Typography fontSize={14} fontWeight='bold'>
            {name}
          </Typography>
        </StyledButton>

        return disabled ? <Tooltip key={name} title='Coming Soon!'><div>{button}</div></Tooltip> : button
      })}
    </Box>
  </>
)

export default function MyAppBar() {
  return (
    <AppBar component='nav' color='secondary'>
      <Box mx={3} my={1}>
        <Toolbar disableGutters>
          {smallLayout}
          {largeLayout}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label='Stats' color='inherit' onClick={() => statsDialogOpen(true)}>
              <BarChartIcon />
            </IconButton>
            <IconButton aria-label='Settings' color='inherit' onClick={() => settingsDialogOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}