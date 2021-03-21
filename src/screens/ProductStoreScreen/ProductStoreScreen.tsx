import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, Container, Grid, Hidden, Paper, Button, InputBase, IconButton, Fab, Snackbar } from '@material-ui/core';
import { Sidebar, Navigation } from '../../components';
import clsx from 'clsx';
import StoreTree from './components/StoreTree';
import ProductCard from './components/ProductCard';
import AddProductDialog from './components/AddProductDialog';
import AddIcon from '@material-ui/icons/Add';
import socketIOClient from "socket.io-client";
import { sideDrawerWidth as drawerWidth } from '../../styles';
import { productFetchAll } from "../../stores/actions";
import { useStyles } from './styles';
import './styles.scss';
import { addProductPurchase } from '../../helpers/private-api.helper';
import { connect } from '../../stores';

const SOCKET_ENDPOINT = "localhost:4001";

export const ProductStoreScreen = connect((state: any) => ({
  productList: state?.product?.productList,
}))(({productList=[]}: any) => {

  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAddNewProductDialog, setOpenAddNewProductDialog] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [scannerIsConnected, setScannerIsConnected] = useState(false);

  const handleDrawerStateChange = (state: boolean) => {
    setIsDrawerOpen(state);
  }

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT, { transports : ['websocket'] });
    socket.on("BARCODE", ({barcode, isConnected}: any) => {
      if (isConnected !== undefined) {
        setScannerIsConnected(isConnected);
      }

      console.log({barcode})

      if(barcode) {
        setScannedBarcode(barcode);
        setOpenAddNewProductDialog(true);
      }
      // handleNewScan(barcode);
    });

    productFetchAll();

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    }

    
  }, []);

  const handleProductSave = (product: any) => {
    addProductPurchase(product).then((res) => {
      console.log("========>", {res})
      productFetchAll();
    })
    // setProducts([...products, {...product, dateUpdated: Date.now()}])
  }

 
  const disableSlider = !useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <div className="dashboard-container">
      <Navigation scannerIsConnected={scannerIsConnected} unreadCount={1} profile={{}} handleDrawerToggle={handleDrawerStateChange}/>

      <Container
        className={clsx(classes.container, {
          [classes.containerShift]: isDrawerOpen && !disableSlider,
          [classes.disableContainerShift]: disableSlider,
        })}
        style={
          isDrawerOpen && !disableSlider? {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          } : {}
        }
      >
        {/* <div className="store-tree-container">
          <StoreTree />
          <StoreTree />
          <StoreTree />
          <StoreTree />
        </div> */}

        <div className="products-container">
          {
            productList.map(({id, name, price, quantity, barcode, vendors, dateUpdated}: any) => (
              <ProductCard 
                key={id}
                name={name} 
                price={price} 
                quantity={quantity} 
                barcode={barcode} 
                vendors={vendors}
                dateUpdated={dateUpdated} 
              />
            ))
          }
        </div>

        <Fab className={classes.composeFabBtn} color="secondary" aria-label="add">
          <AddIcon onClick={() => {
              console.log("Opeing product add modal")
              setOpenAddNewProductDialog(true);
            }} 
          />
        </Fab>

      </Container>


      <AddProductDialog 
        handleProductSave={handleProductSave}
        scannedBarcode={scannedBarcode} 
        open={openAddNewProductDialog} 
        handleClose={() => setOpenAddNewProductDialog(false)}  
      />

{/*       
      <Snackbar open={openEmailDeleteSuccess} autoHideDuration={6000} onClose={() => setOpenEmailDeleteSuccess(false)}>
        <Alert onClose={() => setOpenEmailDeleteSuccess(false)} severity="success">
          Email(s) deleted!
        </Alert>
      </Snackbar> */}
    </div>
  )
});