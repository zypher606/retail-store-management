import React from 'react';
import Chip from '@material-ui/core/Chip';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useStyles } from './styles';

export default function Labels({labels}: any) {
  
  const classes = useStyles();

  return (
    <div>
      <div className={classes.collectionHeading}>LABELS</div>
      <div className={classes.chipCollection}>
        {
          labels.map(({id, name}: any) => (
            <Chip
              key={id}
              data-testid={id}
              className={classes.customChip}
              icon={<LocalOfferIcon className={classes.chipLeftIcon} />}
              label={name}
              clickable
              color="primary"
            />
          ))
        }
        
      </div>
    </div>
  )
}