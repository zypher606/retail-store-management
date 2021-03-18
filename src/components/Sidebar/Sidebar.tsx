import React, { useRef, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { v4 as uuidv4 } from 'uuid';
import Folders from './Folders';
import Categories from './Categories';
import Labels from './Labels';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';


const categories = [
  {
    id: uuidv4(),
    name: 'Work',
    color: '#4fb595'
  },
  {
    id: uuidv4(),
    name: 'Documents',
    color: '#ee524d',
  },
  {
    id: uuidv4(),
    name: 'Social',
    color: '#2c83ca',
  },
  {
    id: uuidv4(),
    name: 'Advertising',
    color: '#55c7ca',
  },
  {
    id: uuidv4(),
    name: 'Clients',
    color: '#f6ad50'
  }
]

const labels = [
  {
    id: uuidv4(),
    name: 'Family',
  },
  {
    id: uuidv4(),
    name: 'Work',
  },
  {
    id: uuidv4(),
    name: 'Home',
  },
  {
    id: uuidv4(),
    name: 'Children',
  },
  {
    id: uuidv4(),
    name: 'Holidays',
  },
  {
    id: uuidv4(),
    name: 'Music',
  },
  {
    id: uuidv4(),
    name: 'Photography',
  },
  {
    id: uuidv4(),
    name: 'Film',
  }
]
// function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
//   return <ListItem button component="a" {...props} />;
// }

interface ISidebar {
  handleComposeMail: any,
  unreadCount: number,
}

export const Sidebar = ({
  handleComposeMail,
  unreadCount,
}: ISidebar) => {

  
  const classes = useStyles();
  
  return (
    <div>
      <div className={classes.sidebarContainer}>
        <div className={classes.composeMailButtonContainer}>
          <Button data-testid="compose-button" onClick={handleComposeMail} className={classes.composeMailButton} variant="contained" color="secondary" >Compose Mail</Button>
        </div>
        <br/>
        <Folders unreadCount={unreadCount} />
        <br/>
        <Categories categories={categories} />
        <br/>
        <Labels labels={labels} />
      
      </div>
      
    </div>
  )
}