import * as React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { makeVar, useReactiveVar } from '@apollo/client'
import pages from './pages'

export const drawerOpen = makeVar(false)

export default function MyDrawer() {
  const open = useReactiveVar(drawerOpen)

  const list = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={() => drawerOpen(false)}
      onKeyDown={() => drawerOpen(false)}
    >
      <List>
        {pages.map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <SwipeableDrawer
        anchor='left'
        open={open}
        onClose={() => drawerOpen(false)}
        onOpen={() => drawerOpen(true)}
      >
        {list}
      </SwipeableDrawer>
    </>
  )
}
