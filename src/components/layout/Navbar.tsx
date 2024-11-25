import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { DRAWER_WIDTH } from '../../constants/layout';

const UKFlag = () => (
  <svg width="24" height="24" viewBox="0 0 512 512">
    <path fill="#012169" d="M0 0h512v512H0z" />
    <path
      fill="#FFF"
      d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
    />
    <path
      fill="#C8102E"
      d="M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
    />
    <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
    <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
  </svg>
);

const GermanFlag = () => (
  <svg width="24" height="24" viewBox="0 0 512 512">
    <path fill="#000" d="M0 0h512v170.7H0z" />
    <path fill="#DD0000" d="M0 170.7h512v170.6H0z" />
    <path fill="#FFCE00" d="M0 341.3h512V512H0z" />
  </svg>
);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface NavbarProps {
  open: boolean;
  onDrawerOpen: () => void;
}

export default function Navbar({ open, onDrawerOpen }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => setAnchorEl(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLanguageClose();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={[{ mr: 2 }, open && { display: 'none' }]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={handleLanguageClick}>
            {i18n.language === 'de' ? <GermanFlag /> : <UKFlag />}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={() => changeLanguage('en')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <UKFlag /> English
              </Box>
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('de')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GermanFlag /> Deutsch
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
