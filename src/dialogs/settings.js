import * as React from 'react'
import { useReactiveVar } from '@apollo/client'
import { settingsDialogOpen, darkMode } from '../reactive-vars'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const ToggleOption = ({title, on, toggle}) => {

  const handleToggle = (toggleStatus) => {
    localStorage.setItem('darkMode', toggleStatus)
    toggle(toggleStatus)
  }

  return (    
    <ListItem>
      <ListItemText primary={title} />
      <Switch
        edge='end'
        onChange={() => handleToggle(!on)}
        checked={on}
      />
    </ListItem>
  )
}

export const SettingsDialog = () => {
  const open = useReactiveVar(settingsDialogOpen)
  const darkModeOn = useReactiveVar(darkMode)

  const handleClose = () => {
    settingsDialogOpen(false)
  }

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign='center'>Settings</DialogTitle>
      <List sx={{ pt: 0, ml: 4, mr: 4}}>
        <ToggleOption title={'Dark Mode'} on={darkModeOn} toggle={darkMode} />
      </List>
    </Dialog>
  )
}