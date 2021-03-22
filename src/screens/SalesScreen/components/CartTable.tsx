import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Card, Paper } from '@material-ui/core';
import { ItemQuantity } from '../../../components';
import { useStyles } from '../styles';

interface ICartTable {
  cartItems: any[];
  handleQuantityChange: any;
  handleCartItemDelete: any;
}

export default function CartTable({handleQuantityChange, handleCartItemDelete, cartItems}: ICartTable) {

  const classes = useStyles();

  const getTotalAmount = (items: any[]) => {
    const amount = items.map(({selectedCount, price}) => selectedCount * price)
    return amount.reduce((a, b) => a + b, 0);
  }
  
  return (
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
  )
} 