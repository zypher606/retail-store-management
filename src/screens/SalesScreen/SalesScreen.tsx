import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, Container, Grid, Hidden, Paper, Button, InputBase, IconButton, Fab, Snackbar } from '@material-ui/core';
import { Sidebar, Navigation, ItemQuantity } from '../../components';
import clsx from 'clsx';
import AddProductDialog from './components/AddProductDialog';
import AddIcon from '@material-ui/icons/Add';
import socketIOClient from "socket.io-client";
import { sideDrawerWidth as drawerWidth } from '../../styles';
import { productFetchAll } from "../../stores/actions";
import { useStyles } from './styles';
import './styles.scss';
import { addProductPurchase } from '../../helpers/private-api.helper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductList from './components/ProductList';

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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export function SalesScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [openAddNewProductDialog, setOpenAddNewProductDialog] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');

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

    productFetchAll();

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
    addProductPurchase(product).then((res) => {
      console.log("=======> added", res)
    })
    // setProducts([...products, {...product, dateUpdated: Date.now()}])
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
        <div className="sales-container" style={{ display: 'flex' }}>
          <div
            style={{ 
              flexGrow: 0.5,
            }}
          >
            <ProductList />
          </div>
          <div 
            style={{ 
              flexGrow: 1,
              maxHeight: '600px',
              overflowY: 'scroll',
            }}
          >
            <TableContainer component={Paper}>
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
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="center">
                        <ItemQuantity quantity={2} itemsAvailable={4} handleChange={() => {}}/> 
                      </TableCell>
                      <TableCell align="right">
                        2
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

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
                </TableBody>

                <TableBody>
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
                      <strong>30020</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
                
              </Table>
            </TableContainer>
          
          </div>

        </div>


        <div className={classes.actionButtons}>
          <Button style={{background: 'red'}} className={classes.actionBtn} variant="contained" color="secondary">
            Clear
          </Button>
          <Button className={classes.actionBtn} variant="contained" color="secondary">
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
}