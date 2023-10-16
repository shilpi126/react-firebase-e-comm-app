import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddressForm from '../components/AddressForm'
import PaymentForm from '../components/PaymentForm'
import ReviewForm from '../components/ReviewForm'
import { clearCart } from '../features/cart-slice'
import { clearCheckoutInformation } from '../features/checkout-slice'
import {Link } from "react-router-dom"

const steps = ["Shipping Address", "Payment Details", "Review Order"]
function getStepContent(activeStep){
  switch(activeStep){
    case 0 : 
    return <AddressForm/>;
    case 1:
    return <PaymentForm/>;
    case 2:
      return <ReviewForm/>;
    default:
      throw new Error("Unknown step")
  }
}

export default function Checkout() {


  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    if(activeStep === steps.length){
      dispatch(clearCart());
      dispatch((clearCheckoutInformation()));
    }
  })

  function handleNext (){
    setActiveStep(activeStep + 1);
  }

  function handleBack (){
    setActiveStep(activeStep - 1);
  }

  return (
    <Container component="section"
    maxWidth="lg"
    sx={{mb:4,}}
    >
      <Paper variant='outlined'
      sx={{my: {xs:3, md:6, }, p:{xs:4}}}
      >
        <Typography component="h1"
        variant='h4'
        align="center"
        >Checkout
        </Typography>
        <Stepper activeStep={activeStep}
        sx={{
          pt:3,
          pb:5,
        }}
        >
          {steps.map((label) => (<Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>))}
        </Stepper>
        {activeStep === steps.length ? (<>
        <Typography variant='h5' gutterBottom>
          Thank you for your order
        </Typography>
        <Typography>
          Your order number is #12234. We have emailed you the details regaeding your order confirmation.
        </Typography>
        <Link to="/">Shop More</Link>
        </> ):(<>{getStepContent(activeStep)}
        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
          {activeStep !==0 && <Button 
          sx={{mt:3,ml:1,}}
          onClick={handleBack} variant="contained">Back</Button>}
          <Button
          sx={{mt:3,ml:1,}}
          onClick={handleNext} variant="contained">{activeStep === steps.length -1? "Place Order":"Next"}</Button>
        </Box>
        </>)}
      </Paper>
    </Container>
  )
}
