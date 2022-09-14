import * as React from 'react'
import { useReactiveVar } from '@apollo/client'
import { settingsDialogOpen, darkMode } from '../reactive-vars'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const ToggleOption = ({on, toggle}) => {

  const handleToggle = (toggleStatus) => {
    localStorage.setItem('darkMode', toggleStatus)
    toggle(toggleStatus)
  }

  return (    
    <ListItem>
      <ListItemText primary={on ? 'Dark Mode' : 'Light Mode'} />
       <IconButton sx={{ ml: 1 }} onClick={() => handleToggle(!on)} color="inherit">
        {on ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </ListItem>
  )
}

export const SettingsDialog = () => {
  const open = useReactiveVar(settingsDialogOpen)
  const darkModeOn = useReactiveVar(darkMode)

  const handleClose = () => settingsDialogOpen(false)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign='center'>Settings</DialogTitle>
      <List sx={{ pt: 0, ml: 4, mr: 4}}>
        <ToggleOption on={darkModeOn} toggle={darkMode} />
      </List>
    </Dialog>
  )
}