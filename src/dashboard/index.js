import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import { SettingsDialog, StatsChartDialog } from '../dialogs';
import { mainListItems } from './list-items';
import { darkMode, settingsDialogOpen, statsDialogOpen } from '../reactive-vars';
import AppBar from './app-bar';
import DrawerHeader from './drawer-header';
import GuessCounter from './guess-counter';
import Main from './main';
import MainGameFooter from './main-game-footer';
import MainGameTitle from './main-game-title';
import GuessingGame from '../guessing-game/GuessingGame';
import Countdown from './countdown';

const drawerWidth = 240;

function DashboardContent() {
  const isDarkMode = useReactiveVar(darkMode);
  let mdTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });
  mdTheme = responsiveFontSizes(mdTheme);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <SettingsDialog />
      <StatsChartDialog />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              LoRdle
            </Typography>
            <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => statsDialogOpen(true)}>
              <BarChartIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => settingsDialogOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {mdTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {mainListItems}
          </List>
        </Drawer>
        <Main open={open} drawerWidth={drawerWidth}>
          <DrawerHeader />
          <MainGameTitle />
          <Countdown />
          <GuessingGame />
          <GuessCounter />
          <MainGameFooter />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}