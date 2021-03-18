import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, useMediaQuery, useTheme } from '@material-ui/core';
import { useStyles } from './styles';
import { sideDrawerWidth as drawerWidth } from '../../styles';
import { StorageManager } from '../../utilities';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../appRoutes/RouteMappings';

interface IHeader {
  isDrawerOpen: any;
  handleDrawerToggle: any;
  unreadCount: number;
}
export const Header = ({
  isDrawerOpen,
  handleDrawerToggle,
  unreadCount,
}: IHeader) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    StorageManager.remove('authorized');
    StorageManager.remove('currentUser');
    window.location.reload(); /// Hard fixing a bug, will take a look at it later
  }

  const disableSlider = !useMediaQuery(theme.breakpoints.up('sm'));

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge 
            badgeContent={
              <span className={classes.badgeContent}>{unreadCount}</span>
            } 
            color="secondary"
          >
            <MailIcon className={classes.navButtons} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge 
            badgeContent={
              <span className={classes.badgeContent}>{12}</span>
            } 
            color="secondary"
          >
            <NotificationsIcon className={classes.navButtons} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="logout"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen && !disableSlider,
          [classes.disableAppbarSlide]: disableSlider,
        })}
        style={
          isDrawerOpen && !disableSlider ? {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          } : {}
        }
      >
        <Toolbar>
          
          <Button
            className={classes.menuButton}
            variant="contained"
            onClick={handleDrawerToggle}
          >
            <MenuIcon color="primary" />
          </Button>
          <div className={classes.search}>
            <InputBase
              placeholder="Search for anything"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails">
              <Badge 
                badgeContent={
                  <span className={classes.badgeContent}>{unreadCount}</span>
                }
                classes={{ badge: classes.mailNavBadge }}
                color="primary"
              >
                <MailIcon className={classes.navButtons} />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge 
                badgeContent={
                  <span className={classes.badgeContent}>{12}</span>
                } 
                color="secondary"
              >
                <NotificationsIcon className={classes.navButtons} />
              </Badge>
            </IconButton>
            <Button
              onClick={handleLogout}
              color="inherit"
              className={classes.navButtonLogout}
            >
              <ExitToAppIcon />
              Logout
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}