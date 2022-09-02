import * as React from 'react';
import { styled, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GuessingGame from './guessing-game/GuessingGame';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import { SettingsDialog, StatsChartDialog } from './dialogs';
import { mainListItems } from './listItems';
import { useReactiveVar } from '@apollo/client';
import { darkMode, settingsDialogOpen, statsDialogOpen, appTheme } from './reactive-vars';
import Countdown from './Countdown';
import { useQuery, gql } from '@apollo/client';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MainGameTitle = () => {
  return (
    <Typography variant="h5" sx={{textAlign: "center", mt: 3}}>Guess today's Legends of Runeterra card</Typography>
  )
}

const MainGameFooter = () => {
  const GET_CARD = gql`
    query GetCardFromYesterday($daysBack: Int!) {
      card(daysBack: $daysBack) {
        name
      }
    }
  `

  const { data, loading } = useQuery(GET_CARD, { variables: { 'daysBack': 1 } })

  return <Typography variant="h6" sx={{textAlign: "center", mt: 3}}>Yesterday's answer was: {loading ? "" : data.card.name}</Typography>
}

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
      <SettingsDialog />
      <StatsChartDialog />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
            <IconButton color="inherit" sx={{mr: 1}} onClick={() => statsDialogOpen(true)}>
              <BarChartIcon/>
            </IconButton>
            <IconButton color="inherit" onClick={() => settingsDialogOpen(true)}>
              <SettingsIcon/>
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
        <Main open={open}>
          <DrawerHeader />
          <MainGameTitle />
          <Countdown/>
          <GuessingGame/>
          <MainGameFooter/>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}