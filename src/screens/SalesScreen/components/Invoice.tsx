import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Paper, Card } from '@material-ui/core';
import { useStyles } from '../styles';

interface IInvoice {
  cartItems: any[];
  printableArea: string;
}
export default function Invoice({cartItems=[], printableArea}: IInvoice) {
  
  const classes = useStyles();

  const getTotalAmount = (items: any[]) => {
    const amount = items.map(({selectedCount, price}) => selectedCount * price)
    return amount.reduce((a, b) => a + b, 0);
  }

  return (
    <TableContainer id={printableArea} component={Paper} >
      <p style={{textAlign: 'center'}}>BILL</p>
      <p style={{textAlign: 'center'}}>****************************</p>
      <table aria-label="simple table" style={{width: '100%'}}>
        
        {/* <thead style={{border: 'none'}}>
          <tr style={{border: 'none'}}>
            <td>Item Name</td>
            <td align="right">Sub Total</td>
          </tr>
        </thead>
 */}

        <tbody style={{border: 'none', padding: '20px'}}>
          {cartItems.map((item: any) => (
            <tr key={item.id} style={{border: 'none'}}>
              <td style={{paddingRight: '20px'}}>
                {item.name} x {item.selectedCount}
              </td>
              <td align="right">
                ₹{item.price * item.selectedCount}
              </td>
            </tr>
          ))}
        </tbody>
        <p>&nbsp;</p>
        <tbody>

          <tr>
         
            <td align="left">
              <strong>NET TOTAL</strong>
            </td>
            <td align="right">
              <strong>₹{getTotalAmount(cartItems)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{textAlign: 'center'}}>****************************</p>

      <p style={{textAlign: 'center'}}>THANK YOU</p>

    </TableContainer>
  )
}