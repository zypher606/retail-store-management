import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import productImage from '../../../assets/images/paella.jpeg';
import productSplashImage from '../../../assets/images/image-holder.png';
import { Badge } from '../../../components';
import Chip from '@material-ui/core/Chip';
import { getFormattedDate } from '../../../utilities';
import VendorList from './VendorList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 335,
      float: 'left',
      margin: '16px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    quantityChip: {
      color: 'rgb(255, 255, 255)',
      float: 'right',
      marginTop: '7px',
      borderRadius: '1px',
      fontSize: '16px',
    }
  }),
);

interface IProductCard {
  name: string;
  price: number | string;
  quantity: number;
  dateUpdated: any;
  barcode?: string;
}

export default function ProductCard({name, price, quantity, dateUpdated, barcode}: IProductCard) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name} [${barcode}]`}
        subheader={getFormattedDate(new Date(dateUpdated))}
      />
      <CardMedia
        className={classes.media}
        image={productSplashImage}
        title="Paella dish"
      />
      <CardContent>
        <Chip color="secondary" size="medium" className={classes.quantityChip} label={`${quantity} Item${quantity > 1 ? 's' : ''}`} />
        <Typography variant="h4" color="textSecondary" component="p">
          ₹ {price} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <VendorList title="Vendors" purchases={[{vendor: 'Hello', }]} />
        </CardContent>
      </Collapse>
    </Card>
  );

}