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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    listTitle: {
      fontSize: '20px',
      lineHeight: '20px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface IVendorList {
  title: string;
  purchases: any[];
}

export default function VendorList({purchases, title}: IVendorList) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.listTitle} component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        purchases.map(({vendorFullName, price, quantity, dateCreated}: any, index) => (
          <ListItem button>
            <ListItemText primary={`${index + 1}. ${vendorFullName}: ₹${price} x (${quantity} items) `} />
          </ListItem>
        ))
      }
    </List>
  );
}
