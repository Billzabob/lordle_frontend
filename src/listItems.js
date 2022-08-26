import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import GameIcon from '@mui/icons-material/VideogameAsset';
import AudioIcon from '@mui/icons-material/Audiotrack';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <GameIcon />
      </ListItemIcon>
      <ListItemText primary="Main Game" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AudioIcon />
      </ListItemIcon>
      <ListItemText primary="Voice Lines" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Idk something else" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Stats" />
    </ListItemButton>
  </React.Fragment>
);