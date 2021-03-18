import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,

    },
    sidebarContainer: {
      width: '100%',
    },
    customChip: {
      color: '#676a6d',
      borderRadius: '2px',
      marginRight: '6px',
      marginBottom: '3px',
      fontSize: '15px',
    },
    collectionHeading: {
      // paddingLeft: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    chipCollection: {
      paddingLeft: '20px',
    },
    chipLeftIcon: {
      fontSize: '15px',
    },
    categoryItem: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    listItemIcon: {
      minWidth: '36px',
    },
    composeMailButtonContainer: {
      // padding: '0 20px',
    },
    composeMailButton: {
      color: '#fff',
      width: '100%',
    }
  }),
);