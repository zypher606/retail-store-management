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
import { useStyles } from './styles';
import './styles.scss';

const ENDPOINT = "localhost:4001";

const mockProducts = [
  {
    name: "Item 1",
    price: 200,
    quantity: 3,
    barcode: '8901725194513',
    dateUpdated: Date.now(),
  },
  {
    name: "Chips",
    price: 200,
    quantity: 5,
    barcode: '89017251944413',
    dateUpdated: Date.now(),
  }
]

export function ProductStoreScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchBoxFocused, setSearchBoxFocused] = useState(false);
  const [isComposeEmailDialogOpen, setIsComposeEmailDialogOpen] = useState(false);
  const [openEmailDeleteSuccess, setOpenEmailDeleteSuccess] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [openAddNewProductDialog, setOpenAddNewProductDialog] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const selectedEmails = new Set(); 

  const handleDrawerStateChange = (state: boolean) => {
    setIsDrawerOpen(state);
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports : ['websocket'] });
    socket.on("BARCODE", ({barcode}: any) => {
      // setResponse(data);
      // console.log("DATA ========> ", {data})
      handleNewScan(barcode)
    });

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    }
  }, []);

  const handleNewScan = (barcode: any) => {

    setScannedBarcode(barcode);
    const existingProduct = products.find(({barcode: existingBarcode}: any) => (
                                existingBarcode === barcode
                              ));
    
    if (!existingProduct) {
      setOpenAddNewProductDialog(true);
    } else {
      const updatedProducts = products.map((product: any) => {
        if (product.barcode === barcode) {
          product.quantity += 1;
        }
        return product;
      })
      setProducts(updatedProducts);
    }
  }

  const handleProductSave = (product: any) => {
    console.log({product})
    setProducts([...products, {...product, dateUpdated: Date.now()}])
  }


 
  const disableSlider = !useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <div className="dashboard-container">
      <Navigation unreadCount={1} profile={{}} handleDrawerToggle={handleDrawerStateChange}/>

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
            products.map(({name, price, quantity, barcode, dateUpdated}: any) => (
              <ProductCard 
                name={name} 
                price={price} 
                quantity={quantity} 
                barcode={barcode} 
                dateUpdated={dateUpdated} 
              />
            ))
          }
        </div>
        


        <Fab className={classes.composeFabBtn} color="secondary" aria-label="add">
          <AddIcon onClick={() => setOpenAddNewProductDialog(true)} />
        </Fab>

      </Container>


      <AddProductDialog 
        handleProductSave={handleProductSave}
        barcode={scannedBarcode} 
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
}