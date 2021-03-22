import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Avatar, Chip, ListItemAvatar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export default function ProductList({productList=[], handleItemSelect}: any) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Product List
        </ListSubheader>
      }
      className={classes.root}
      style={{
        maxHeight: '600px',
        overflowY: 'scroll',
      }}
    >
      {
        productList.map(({id, name, price, quantity, ...rest}: any) => (
          <ListItem onClick={() => handleItemSelect({id, name, price, quantity, ...rest})} button key={id}>
            <ListItemAvatar>
              <Avatar>
                {name[0]}
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary={name} />
            <Chip
              label={`${quantity} Items`}
              variant="outlined"
            />
          </ListItem>
        ))
      }
      
    </List>
  );
}