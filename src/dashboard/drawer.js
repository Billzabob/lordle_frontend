import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { makeVar, useReactiveVar } from '@apollo/client'
import pages from './pages'

export const drawerOpen = makeVar(false)

export default function MyDrawer() {
  const open = useReactiveVar(drawerOpen)

  const list = (
    <Box
      sx={{ width: 180 }}
      role='presentation'
      onClick={() => drawerOpen(false)}
      onKeyDown={() => drawerOpen(false)}
    >
      <List>
        {pages.map(({name, icon}) => (
          <ListItem key={name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
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
