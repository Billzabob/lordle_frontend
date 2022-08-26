import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import { settingsDialogOpen } from '../reactive-vars';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
ListItem

const ToggleOption = ({title, onToggle}) => {

}




export const SettingsDialog = () => {
  const open = useReactiveVar(settingsDialogOpen);

  const handleClose = () => {
    settingsDialogOpen(false);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Settings</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={email} />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}