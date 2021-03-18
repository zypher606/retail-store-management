import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useStyles } from './styles';

export default function Categories({categories}: any) {

  const classes = useStyles();

  return (
    <List component="nav" aria-label="main mailbox folders">
      <div className={classes.collectionHeading}>CATEGORIES</div>
      {
        categories.map(({id, name, color}: any) => (
          <ListItem className={classes.categoryItem} key={id} button>
            <ListItemIcon className={classes.listItemIcon}>
              <FiberManualRecordIcon style={{color, fontSize: '21px'}} />
            </ListItemIcon>
            <ListItemText data-testid={id} primary={name} />
          </ListItem>
        ))
      }
      
    </List>
  )
}