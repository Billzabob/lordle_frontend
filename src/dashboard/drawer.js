import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { drawerOpen } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import pages from './pages'
import React from 'react'

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
        {pages.map(({name, icon, link}) => (
          <ListItem key={name} disablePadding>
            <ListItemButton href={link}>
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
