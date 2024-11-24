import { useState } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DrawerHeader from '../common/DrawerHeader';

import { DRAWER_WIDTH } from '../../constants/layout';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => {
  return {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  };
});

export default function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar open={open} onDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} onDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>CONTENT</Typography>
      </Main>
    </Box>
  );
}
