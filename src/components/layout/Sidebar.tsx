import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DrawerHeader from '../common/DrawerHeader';

import { DRAWER_WIDTH } from '../../constants/layout';

const MENU_ITEMS = [
  { text: 'User Input Mask', path: '/user-input-mask' },
  { text: 'Admin Overview', path: '/admin-overview' },
];

interface SidebarProps {
  open: boolean;
  onDrawerClose: () => void;
}

export default function Sidebar({ open, onDrawerClose }: SidebarProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
    onDrawerClose();
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {MENU_ITEMS.map(({ text, path }) => (
          <div key={text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuClick(path)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Drawer>
  );
}
