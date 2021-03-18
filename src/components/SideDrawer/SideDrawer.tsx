import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BorderOuterIcon from '@material-ui/icons/BorderOuter';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import WidgetsIcon from '@material-ui/icons/Widgets';
import DescriptionIcon from '@material-ui/icons/Description';
import ComputerIcon from '@material-ui/icons/Computer';
import { useStyles } from './styles';
import userAvatarIcon from '../../assets/images/avatar-user-svg.svg';
import { Avatar, useMediaQuery } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';

interface ISideDrawer {
  isDrawerOpen: boolean;
  profile: any;
  handleDrawerClose?: any;
}

export const SideDrawer = ({
  isDrawerOpen,
  profile,
  handleDrawerClose,
}: ISideDrawer) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openMailboxTab, setOpenMailboxTab] = useState(true);

  const handleMailboxTabClick = () => {
    setOpenMailboxTab(!openMailboxTab);
  }

  const drawerContent = (
    <>
      <div className={classes.toolbar}>
        <Avatar alt="Ashim Raj" src={userAvatarIcon} />
        <div data-testid="user-fullname" className={classes.toolbarUsername}>
          {
            profile?.name || 'John Doe'
          }
        </div>
      </div>
      <Divider />

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.listTabStyles}
      >
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <DashboardIcon  />
          </ListItemIcon>
          <ListItemText primary="Dashboards" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <BorderOuterIcon />
          </ListItemIcon>
          <ListItemText primary="Layouts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Graphs" />
          <KeyboardArrowLeftIcon />
        </ListItem>
        <ListItem 
          button
          className={classes.listTabActiveStyles} 
          onClick={handleMailboxTabClick}
        >
          <ListItemIcon className={classes.listTabActiveStyles}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText data-testid="button-mailbox" primary="Store Management" />
          {openMailboxTab && isDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
        </ListItem>
        <Collapse in={openMailboxTab && isDrawerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={clsx(classes.nested, classes.listTabActiveStyles)}>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Brands" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="All Products" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="More" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Metrics" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Widgets" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Forms" />
          <KeyboardArrowLeftIcon />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listTabStyles}>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText primary="App Views" />
        </ListItem>
      </List>
    </>
  );

  const matches = !useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      {
        matches ? (
          <Drawer
            variant="temporary"
            open={isDrawerOpen}
            className={classes.drawer}
            classes={{
              paper: clsx({
                [classes.paper]: true,
              } ),
            }}
            onClose={handleDrawerClose}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: isDrawerOpen,
              [classes.drawerClose]: !isDrawerOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: isDrawerOpen,
                [classes.drawerClose]: !isDrawerOpen,
                [classes.paper]: true,
              } ),
            }}
          >
            {drawerContent}
          </Drawer>
        )
        
      }
    </div>
    
  )
}