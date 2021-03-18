import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, Container, Grid, Hidden, Paper, Button, InputBase, IconButton, Fab, Snackbar } from '@material-ui/core';
import { Sidebar, Navigation } from '../../components';
import clsx from 'clsx';
import StoreTree from './components/StoreTree';
import AddIcon from '@material-ui/icons/Add';
import { sideDrawerWidth as drawerWidth } from '../../styles';
import { useStyles } from './styles';
import './styles.scss';

export function ProductStoreScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchBoxFocused, setSearchBoxFocused] = useState(false);
  const [isComposeEmailDialogOpen, setIsComposeEmailDialogOpen] = useState(false);
  const [openEmailDeleteSuccess, setOpenEmailDeleteSuccess] = useState(false);
  
  const selectedEmails = new Set(); 

  const handleDrawerStateChange = (state: boolean) => {
    setIsDrawerOpen(state);
  }

  useEffect(() => {
  }, []);

 
  const disableSlider = !useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <div className="dashboard-container">
      <Navigation unreadCount={1} profile={{}} handleDrawerToggle={handleDrawerStateChange}/>

      <Container
        className={clsx(classes.container, {
          [classes.containerShift]: isDrawerOpen && !disableSlider,
          [classes.disableContainerShift]: disableSlider,
        })}
        style={
          isDrawerOpen && !disableSlider? {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          } : {}
        }
      >
        <div className="store-tree-container">
          <StoreTree />
          <StoreTree />
          <StoreTree />
          <StoreTree />
        </div>

        


        <Fab className={classes.composeFabBtn} color="secondary" aria-label="add">
          <AddIcon onClick={() => setIsComposeEmailDialogOpen(true)} />
        </Fab>

      </Container>

{/*       
      <Snackbar open={openEmailDeleteSuccess} autoHideDuration={6000} onClose={() => setOpenEmailDeleteSuccess(false)}>
        <Alert onClose={() => setOpenEmailDeleteSuccess(false)} severity="success">
          Email(s) deleted!
        </Alert>
      </Snackbar> */}
    </div>
  )
}