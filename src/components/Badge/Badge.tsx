import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    folderBadge: {
      color: '#fff',
      fontSize: '12px',
      padding: '1px 7px',
      borderRadius: '2px',
      display: 'inline',
    },
  })
);

interface IBadge {
  color: string;
  children: any;
}
export const Badge = ({
  color: background,
  children,
  ...rest
}: IBadge)  => {

  const classes = useStyles();

  return (
    <div data-testid="badge-container" {...rest} className={classes.folderBadge} style={{background}}>{children}</div>
  )
}