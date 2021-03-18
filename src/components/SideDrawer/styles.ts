import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { sideDrawerWidth } from '../../styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    nested: {
      paddingLeft: theme.spacing(9),
    },
    listTabStyles: {
      color: '#a7b1c3'
    },
    listTabActiveStyles: {
      color: '#fff',
    },
    hide: {
      display: 'none',
    },
    paper: {
      background: "#2f4051"
    },
    drawer: {
      width: sideDrawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: sideDrawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: '73px',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolbarUsername: {
      marginLeft: theme.spacing(3),
      color: '#fff',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    
  }),
);