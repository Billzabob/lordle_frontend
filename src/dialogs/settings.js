import { IconButton } from '@mui/material'
import { settingsDialogOpen, darkMode, highContrastMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const ToggleOption = ({ on, toggle, name, option1, option2, icon1, icon2 }) => {

  const handleToggle = (toggleStatus) => {
    localStorage.setItem(name, toggleStatus)
    toggle(toggleStatus)
  }

  return (
    <ListItem>
      <ListItemText primary={on ? option1 : option2} />
      <IconButton sx={{ ml: 1 }} onClick={() => handleToggle(!on)} color='inherit'>
        {on ? icon1 : icon2}
      </IconButton>
    </ListItem>
  )
}

export const SettingsDialog = () => {
  const open = useReactiveVar(settingsDialogOpen)
  const darkModeOn = useReactiveVar(darkMode)
  const highContrastModeOn = useReactiveVar(highContrastMode)

  const handleClose = () => settingsDialogOpen(false)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign='center'>Settings</DialogTitle>
      <List sx={{ pt: 0, ml: 4, mr: 4 }}>
        <ToggleOption
          name='darkMode'
          on={darkModeOn}
          toggle={darkMode}
          option1='Dark Mode'
          option2='Light Mode'
          icon1={<Brightness7Icon />}
          icon2={<Brightness4Icon />}
        />
        <ToggleOption
          name='highContrastMode'
          on={highContrastModeOn}
          toggle={highContrastMode}
          option1='Colorblind Mode'
          option2='Colorblind Mode'
          icon1={<VisibilityOffIcon />}
          icon2={<VisibilityIcon />}
        />
      </List>
    </Dialog>
  )
}