import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux"

export default function AddressForm() {
    const address = useSelector(state => state.checkout?.address);
    const dispatch = useDispatch()

    function handleChange(event){
        // console.log(event.target)
        const {name, value} = event.target;
        dispatch(updateAddress({[name]: value}))

      
    }

  return (
    <>
    <Typography variant='h6' gutterBottom>
        Shipping Address
    </Typography>
    <Box component="form" onChange={handleChange}>
        <Grid container spacing={3}> 
            <Grid item xs={12} sm={6}>
                <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete='given-name' 
                variant='standard' defaultValue={address.firstName ?? ""}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete='given-name' 
                variant='standard' defaultValue={address.lasstName ?? ""}/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.address1 ?? ""} required id="address1" name="address1" label="Address Line 1" fullWidth variant='standard'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.address2 ?? ""} required id="address2" name="address2" label="Address Line 2" fullWidth  variant='standard'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.city ?? ""} required id="city" name="city" label="City" fullWidth  variant='standard'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.zipCode ?? ""} required id="zipCode" name="zipCode" label="ZipCode/PostalCode" fullWidth  variant='standard'/>
            </Grid>
            <Grid item xs={12}>
                <TextField defaultValue={address.country ?? ""} required id="country" name="country" label="Country" fullWidth  variant='standard'/>
            </Grid>
        </Grid>
    </Box>
    </>
  )
}
