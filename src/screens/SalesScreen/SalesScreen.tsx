import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, Container, Grid, Hidden, Paper, Button, InputBase, IconButton, Fab, Snackbar, Card } from '@material-ui/core';
import { Sidebar, Navigation, ItemQuantity } from '../../components';
import clsx from 'clsx';
import AddProductDialog from './components/AddProductDialog';
import AddIcon from '@material-ui/icons/Add';
import socketIOClient from "socket.io-client";
import { sideDrawerWidth as drawerWidth } from '../../styles';
import { productFetchAll } from "../../stores/actions";
import { useStyles } from './styles';
import './styles.scss';
import { addProductPurchase, placeOrder } from '../../helpers/private-api.helper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductList from './components/ProductList';
import CartTable from './components/CartTable';
import Invoice from './components/Invoice';
import { connect } from '../../stores';

const SOCKET_ENDPOINT = "localhost:4001";

const socket = socketIOClient(SOCKET_ENDPOINT, { transports : ['websocket'] });

export const SalesScreen = connect((state: any) => ({
  productList: state?.product?.productList,
}))(({productList=[]}: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAddNewProductDialog, setOpenAddNewProductDialog] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [scannerIsConnected, setScannerIsConnected] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const handleDrawerStateChange = (state: boolean) => {
    setIsDrawerOpen(state);
  }

  

  useEffect(() => {
    
    socket.on("BARCODE", ({barcode, isConnected}: any) => {
      if (isConnected !== undefined) {
        setScannerIsConnected(isConnected);
      }
      if(barcode) {
        setScannedBarcode(barcode);        
      }
    });

    productFetchAll();

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    }
    
  }, []);

  useEffect(() => {
    if (scannedBarcode) {
      handleScan(scannedBarcode, cartItems);
    }
  }, [scannedBarcode])

  const handleScan = (barcode: any, cartItems: any[]) => {
    const existingItem = cartItems.find((item: any) => item.barcode === barcode);
    if (existingItem) {
      handleQuantityChange(existingItem.id, existingItem.selectedCount + 1);
    } else {
      const product = productList.find((item: any) => item.barcode === barcode);
      if (product) {
        handleItemSelect(product)
      } else {
        // Product not fount
      }
    }
    setScannedBarcode('');
  }

  const handlePlaceOrder = () => {
    const payload = {
      products: cartItems,
      netTotal: getTotalAmount(cartItems),
    }
    placeOrder(payload).then((res: any) => {

      setShowInvoice(true);
    })
  }

  const handleProductSave = (product: any) => {
    addProductPurchase(product).then((res) => {
      console.log("=======> added", res)
    })
    // setProducts([...products, {...product, dateUpdated: Date.now()}])
  }

  const handleItemSelect = (product: any) => {
    const exists = cartItems.find(({barcode}: any) => barcode === product.barcode);
    if (!exists) {
      setCartItems([...cartItems, {...product, availableCount: product.quantity, selectedCount: 1}])
    }
  }

  const handleQuantityChange = (id: string, value: number) => {
    const items = cartItems.map((item: any) => {
      if (id === item.id) {
        return {...item, selectedCount: value}
      }
      return item;
    });
    setCartItems(items);
  }

  const handleCartItemDelete = (id: string) => {
    const items = cartItems.filter((item: any) => item.id !== id);
    setCartItems(items);
  }

  const getTotalAmount = (items: any[]) => {
    const amount = items.map(({selectedCount, price}) => selectedCount * price)
    return amount.reduce((a, b) => a + b, 0);
  }

  const printableArea = "invoice-container";
  const handleInvoicePrint = () => {
    const printableElements = document.getElementById(printableArea)?.innerHTML;
    const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtml;
    window.print();
    document.body.innerHTML = oldPage

  }
 
  const disableSlider = !useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <div className="dashboard-container">
      <Navigation scannerIsConnected={scannerIsConnected}  unreadCount={1} profile={{}} handleDrawerToggle={handleDrawerStateChange}/>

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
        <div className="sales-container" style={{ display: 'flex' }}>
          <div
            style={{ 
              flexGrow: 0.2,
            }}
          >
            <ProductList productList={productList} handleItemSelect={handleItemSelect} />
          </div>
          <div 
            style={{ 
              flexGrow: 1,
              maxHeight: '550px',
              overflowY: 'scroll',
            }}
          >

            {
              showInvoice === false && 
              <CartTable 
                cartItems={cartItems} 
                handleCartItemDelete={handleCartItemDelete} 
                handleQuantityChange={handleQuantityChange} 
              />
            }

            {
              showInvoice === true && 
              <Invoice 
                cartItems={cartItems} 
                printableArea={printableArea}
              />
            }
            
          
          </div>

        </div>


        <div className={classes.actionButtons}>
          <Button style={{background: 'red'}} className={classes.actionBtn} variant="contained" color="secondary">
            Clear
          </Button>
          <Button onClick={handlePlaceOrder} className={classes.actionBtn} variant="contained" color="secondary">
            Place Order
          </Button>

          <Button onClick={handleInvoicePrint} className={classes.actionBtn} variant="contained" color="secondary">
            Print Invoice
          </Button>
          
        </div>

      </Container>


      <AddProductDialog 
        handleProductSave={handleProductSave}
        barcode={scannedBarcode} 
        open={openAddNewProductDialog} 
        handleClose={() => setOpenAddNewProductDialog(false)}  
      />

      
      {/* <Snackbar open={openEmailDeleteSuccess} autoHideDuration={6000} onClose={() => setOpenEmailDeleteSuccess(false)}>
        <Alert onClose={() => setOpenEmailDeleteSuccess(false)} severity="success">
          Email(s) deleted!
        </Alert>
      </Snackbar> */}
    </div>
  )
})