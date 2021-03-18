import React from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 400,
      margin: '18px',
      backgroundColor: theme.palette.background.paper,
      float: 'left',
    },
    // nested: {
    //   paddingLeft: theme.spacing(4),
    // },
    icon: {
      minWidth: '36px',
    }
  }),
);

export default function StoreTree() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const tree = [
    {
      title: 'Groceries',
      color: 'green',
      children: [
        {
          title: 'Groceries',
          color: 'green'
        },
        {
          title: 'Snacks',
          color: 'yellow',
        },
        {
          title: 'Pickle',
          color: 'red',
        }
      ]
    },
    {
      title: 'Snacks',
      color: 'yellow',
      children: [
        {
          title: 'Groceries',
          color: 'green'
        },
        {
          title: 'Snacks',
          color: 'yellow',
        },
        {
          title: 'Pickle',
          color: 'red',
        },
      ],
    },
    {
      title: 'Pickle',
      color: 'red',
      children: [
        {
          title: 'Groceries',
          color: 'green'
        },
        {
          title: 'Snacks',
          color: 'yellow',
        },
        {
          title: 'Pickle',
          color: 'red',
        },
      ],
    }
  ]

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <h2>Nested List Items</h2>
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        tree.map(({title, color, children}: any) => (
          <TreeItem title={title} color={color} children={children} level={1} />
        ))
      }

{/* 
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
       */}
    </List>
  );

}

function TreeItem({color, title, children, level }: any) {

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleClick} style={{ paddingLeft: theme.spacing(2*level + 1) }}>
        <ListItemIcon className={classes.icon}>
          <FiberManualRecordIcon style={{ color }} />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <RemoveIcon /> : <AddIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { 
            children &&
            children.map(({color, title, children}: any) => (
              <TreeItem title={title} color={color} children={children} level={level + 1} />
            ))
            
          }
          <ListItem button style={{ paddingLeft: theme.spacing(2*(level+1) + 1) }}>
            <ListItemIcon className={classes.icon}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}