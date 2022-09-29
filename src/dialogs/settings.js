import { Switch } from '@mui/material'
import { settingsDialogOpen, darkMode, highContrastMode } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'

const ToggleOption = ({ on, toggle, name, title }) => {

  const handleToggle = (toggleStatus) => {
    localStorage.setItem(name, toggleStatus)
    toggle(toggleStatus)
  }

  return (
    <ListItem>
      <ListItemText primary={title} />
      <Switch checked={on} onChange={() => handleToggle(!on)} color='secondary' />
    </ListItem>
  )
}

export default function SettingsDialog() {
  const open = useReactiveVar(settingsDialogOpen)
  const darkModeOn = useReactiveVar(darkMode)
  const highContrastModeOn = useReactiveVar(highContrastMode)

  const handleClose = () => settingsDialogOpen(false)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle variant='h4' textAlign='center'>Settings</DialogTitle>
      <List sx={{ pt: 0, mx: 4 }}>
        <ToggleOption
          name='darkMode'
          on={darkModeOn}
          toggle={darkMode}
          title='Dark Mode'
        />
        <ToggleOption
          name='highContrastMode'
          on={highContrastModeOn}
          toggle={highContrastMode}
          title='Colorblind Mode'
        />
      </List>
    </Dialog>
  )
}