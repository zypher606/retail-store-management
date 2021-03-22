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
import { connect } from '../../stores';

const SOCKET_ENDPOINT = "localhost:4001";

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
        // setScannedBarcode(barcode);
        // setOpenAddNewProductDialog(true);
        handleNewScan(barcode);
      }
    });

    productFetchAll();

    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    }
    
  }, []);

  const handleNewScan = (barcode: any) => {

  }

  const handlePlaceOrder = () => {
    const payload = {
      products: cartItems,
      netTotal: getTotalAmount(cartItems),
    }
    placeOrder(payload).then((res: any) => {
      console.log("=======> placed", res)
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
            <TableContainer component={Paper}>
              {
                cartItems.length > 0 &&
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="left">Barcode</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="right">Sub Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="left">{item.barcode}</TableCell>
                        <TableCell align="right">₹{item.price}</TableCell>
                        <TableCell align="center">
                          <ItemQuantity 
                            quantity={item.selectedCount} 
                            itemsAvailable={item.availableCount} 
                            handleChange={(value) => handleQuantityChange(item.id, value)}
                            handleItemDelete={() => handleCartItemDelete(item.id)}
                          /> 
                        </TableCell>
                        <TableCell align="right">
                          ₹{item.price * item.selectedCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

  {/*                 
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <strong>GROSS TOTAL</strong>
                      </TableCell>
                      <TableCell align="right">13 %</TableCell>
                    </TableRow>
                  </TableBody> */}

                  {/* <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <strong>TAX</strong>
                      </TableCell>
                      <TableCell align="right">13 %</TableCell>
                    </TableRow>
                  </TableBody>
                  */}

                  {/* <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <strong>DISCOUNT</strong>
                      </TableCell>
                      <TableCell align="right">-200</TableCell>
                    </TableRow>
                  </TableBody> */}

                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <strong>NET TOTAL</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>₹{getTotalAmount(cartItems)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  
                </Table>
              }

              {
                cartItems.length === 0 &&
                <Card style={{width: '100%'}}>
                  <h4 style={{textAlign: 'center', padding: '160px 100px'}}>Please add items to cart!</h4>
                </Card>
              }
            </TableContainer>
          
          </div>

        </div>


        <div className={classes.actionButtons}>
          <Button style={{background: 'red'}} className={classes.actionBtn} variant="contained" color="secondary">
            Clear
          </Button>
          <Button onClick={handlePlaceOrder} className={classes.actionBtn} variant="contained" color="secondary">
            Place Order
          </Button>
          
        </div>

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
})