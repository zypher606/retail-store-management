import React, { forwardRef, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Divider, RootRef } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: any) => ({
  detailExpanded: {
    maxHeight: '200px',
    transition: 'max-height 0.25s ease-in',
    overflow: 'hidden',
  },
  detailCollapsed: {
    maxHeight: '0px',
    transition: 'max-height 0.15s ease-out',
    overflow: 'hidden',
  }
}));
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#fff',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(8),
  },
}))(MuiAccordionDetails);

interface ICustomAccordion {
  openDefault: boolean;
  fixed?: boolean;
  heading: any;
  body: any;
}

export const CustomAccordion = ({
  openDefault = false,
  fixed = false,
  heading,
  body,
  
}: ICustomAccordion) => {

  const [expanded, setExpanded] = useState<boolean>(openDefault);
  const classes = useStyles();

  const toggleExpanded = () => {
    if (fixed) return;
    setExpanded(!expanded);
  }

  return (
    <Accordion square expanded={true}>
      <AccordionSummary onClick={toggleExpanded} className={expanded ? 'is-expanded' : 'is-not-expanded'}>
        { heading }
      </AccordionSummary>
      <div className={expanded ? classes.detailExpanded : classes.detailCollapsed}>
        <AccordionDetails>
          {body}
        </AccordionDetails>
      </div>
      
    </Accordion>

    
  );
}