import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useStyles } from './styles';
import { Badge } from '../';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../appRoutes/RouteMappings';


export default function Folders({unreadCount}: any) {

  const classes = useStyles();
  const history = useHistory();

  const navigateToMailbox = () => {
    history.push(Routes.MAILBOX);
  }

  return (
    <List component="nav" aria-label="main mailbox folders">
      <div className={classes.collectionHeading}>FOLDERS</div>
      <ListItem button onClick={navigateToMailbox} >
        <ListItemIcon className={classes.listItemIcon} >
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        <Badge data-testid="unread-badge" color={'#ee524d'}>{unreadCount}</Badge>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon className={classes.listItemIcon} >
          <MailOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Send Mail" />
        
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon className={classes.listItemIcon} >
          <StarBorderIcon />
        </ListItemIcon>
        <ListItemText primary="Important" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon className={classes.listItemIcon} >
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
        <Badge color={'#ee524d'}>12</Badge>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon className={classes.listItemIcon} >
          <DeleteOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider />
    </List>
  )
}