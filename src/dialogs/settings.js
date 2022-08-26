import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import { settingsDialogOpen, darkMode } from '../reactive-vars';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ToggleOption = ({title, on, toggle}) => {
  return (    
    <ListItem>
      <ListItemText primary={title} />
      <Switch
        edge="end"
        onChange={() => toggle(!on)}
        checked={on}
      />
    </ListItem>
  )
}




export const SettingsDialog = () => {
  const open = useReactiveVar(settingsDialogOpen);
  const darkModeOn = useReactiveVar(darkMode);

  const handleClose = () => {
    settingsDialogOpen(false);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Settings</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ToggleOption title={"Dark Mode"} on={darkModeOn} toggle={darkMode} />
      </List>
    </Dialog>
  );
}