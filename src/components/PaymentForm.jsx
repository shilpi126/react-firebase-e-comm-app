import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function PaymentForm() {
    

    const payment = useSelector(state => state.checkout?.payment);
    const dispatch = useDispatch()

    function handleChange(event){
        // console.log(event.target)
        const {name, value} = event.target;
        dispatch(updatePayment({[name]: value}))

      
    }
    
    return (
        <>
        <Typography variant='h6' gutterBottom>
            Payment Method
        </Typography>
        <Box component="form" onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField  name="name" id="name" variant='standard' required defaultValue={payment?.name?? ""} label="Name on card" fullWidth autoComplete='cc-name'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField  name="cardNumber" id="cardNumber" variant='standard' required defaultValue={payment?.cardNumber?? ""} label="cardNumber" fullWidth autoComplete='cc-number'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField  name="expDate" id="expDate" variant='standard' required defaultValue={payment?.expDate?? ""} label="Expiry Date" fullWidth autoComplete='cc-exp'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField  name="cvv" id="cvv" variant='standard' required defaultValue={payment?.cvv?? ""} label="CVV" type="password" fullWidth autoComplete='cc-csc'/>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}
