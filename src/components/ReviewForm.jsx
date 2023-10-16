import { Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import {getSubTotal} from "../utils"

export default function ReviewForm() {
  const cart = useSelector((state) => state.cart.value);
  const address = useSelector((state) => state.checkout.address);
  const payment = useSelector((state) => state.checkout.payment);
  const theme = useTheme()
  const addresses = address? Object.values(address):[];
  const payments = payment? [
    {
    name:"Card Type",
    details:"Visa"
  },
  {
    name:"Card Number",
    details:payment.cardNumber,
  },
  {
    name:"Card Holder",
    details:payment.name,
  },
  {
    name:"Expiry Date",
    details:payment.expDate,
  }
] : []; 


  return (
    <>
    <Typography>Order Summary</Typography>
    <List disablePadding>
      {cart?.map(({product, quantity}) => 
      <ListItem key = {product.title} sx={{py:1, px:0}}>
        <ListItemText sx={{
          "& .MuiListItemText-primary":{
            fontWeight:500,
          },
          "& .MuiListItemText-secondary":{
            fontSize:theme.spacing(2),
          }
        }} primary={product.title} secondary={`Qty: ${quantity}`}/>
        <Typography variant='body2'>
          {getSubTotal([{product,quantity}])?.toFixed(2)}
        </Typography>
      </ListItem>
      )}
      <ListItem>
        <ListItemText primary="Total"/>
        <Typography variant='subtitle1'
        sx={{fontWeight:700, }}
        >{getSubTotal(cart).toFixed(2)}</Typography>
      </ListItem>
    </List>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant='h6' gutterBottom sx={{mt:2}}>Shipping</Typography>
        <Typography gutterBottom>
          {addresses.join(", ")}
        </Typography>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" sx={{mt:2}}>Payment Details</Typography>
          <Grid container>{payments.map(({name, details}) => <>
          <Grid key={name} item xs={6}>
            <Typography gutterButtom>{name}</Typography>
          </Grid>
          <Grid key={details} item xs={6}>
            <Typography gutterButtom>{details}</Typography>
          </Grid>
          </>
          )}
          </Grid>
      </Grid>
    </Grid>
    </>
  )
}
