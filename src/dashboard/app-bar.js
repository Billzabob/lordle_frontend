import * as React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../Logo'
import SettingsIcon from '@mui/icons-material/Settings'
import { settingsDialogOpen } from '../reactive-vars'

const pages = ['Classic', 'Quote', 'Splash']

export default function MyAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const handleCloseNavMenu = () => setAnchorElNav(null)

  return (
    <AppBar component='nav'>
      <Box mx={3}>
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color='inherit'
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1 }}}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
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