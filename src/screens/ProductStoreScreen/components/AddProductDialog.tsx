import React, { useEffect, useState } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles, TextField } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '560px',
      },
    },
  }),
);

export default function AddProductDialog({ open, handleClose, scannedBarcode, handleProductSave }: any) {

  const classes = useStyles();
  const [name, setName] = useState('');
  const [quantity, setquantity] = useState('1');
  const [mrp, setMrp] = useState('');
  const [barcode, setBarcode] = useState(scannedBarcode);
  const [buyingPrice, setBuyingPrice] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorMobile, setVendorMobile] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');

  const handleSubmit = () => {
    handleProductSave({ 
      name, 
      quantity: parseInt(quantity), 
      mrp: parseInt(mrp), 
      buyingPrice: parseInt(buyingPrice), 
      vendorName, 
      vendorMobile, 
      vendorAddress, 
      barcode 
    });
    // handleClose();
  }

  useEffect(() => {
    setBarcode(scannedBarcode)
  }, [scannedBarcode])

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Product
        </DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              label="Product Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div style={{display: 'flex'}}>
              <TextField
                required
                label="Barcode"
                variant="outlined"
                style={{ flexGrow: 1 }}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <TextField
                required
                label="MRP"
                variant="outlined"
                style={{ flexGrow: 1, marginRight: '0px' }}
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                type="number"
              />
            </div>

            <TextField
                required
                label="Vendor Name"
                variant="outlined"
                style={{ flexGrow: 1 }}
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                type="text"
            />

            <div style={{display: 'flex'}}>
              <TextField
                required
                label="Buying Price"
                variant="outlined"
                style={{ flexGrow: 1 }}
                value={buyingPrice}
                onChange={(e) => setBuyingPrice(e.target.value)}
                type="number"
              />
              <TextField
                required
                label="Quantity"
                variant="outlined"
                style={{ flexGrow: 1, marginRight: '0px' }}
                value={quantity}
                onChange={(e) => setquantity(e.target.value)}
                type="number"
              />
            </div>

            <div style={{display: 'flex'}}>
              <TextField
                label="Vendor Mobile"
                variant="outlined"
                style={{ flexGrow: 1 }}
                value={vendorMobile}
                onChange={(e) => setVendorMobile(e.target.value)}
                type="number"
              />
              <TextField
                label="Vendor Address"
                variant="outlined"
                style={{ flexGrow: 1, marginRight: '0px' }}
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
                type="text"
              />
            </div>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}