import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Container, TextField, Typography, useTheme } from '@mui/material'
import {Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
//import { useTheme } from '@mui/system'
import {Rating} from '@mui/material'
import { getSubTotal } from '../utils'
import { addToCart, removeFromCart } from '../features/cart-slice'
import {useNavigate} from 'react-router-dom'


export default function Cart() {
  const cart = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subtotal = getSubTotal(cart)?.toFixed(2);// .toFix is fix the decimal value
  function  UpdateQuantity (e, {product, quantity}){
      const updatedQuantity = e.target.valueAsNumber;
      if(updatedQuantity < quantity){
        // remove from cart
        dispatch(removeFromCart({product}))
      }else{
        dispatch(addToCart({ product }))
      }
  }

  function goToHome(){
    navigate("/");
  }

  function checkoutItems(){
    navigate("/checkout");
  }




  return (
    <Container sx={{py:8}}>
      <Grid container spcing={2}>
      
        <Grid item container spacing={2} md={8}>
          {cart?.map(({product, quantity}) => {
            const {title, id, price, discription, rating, image } = product;
            return(
              <Grid item key={id} xs={12}>
                <Card sx={{display:"flex", py:"2",}}>
                <CardMedia 
                component="img" 
                  image={image} 
                  sx={{
                  width: theme.spacing(30),
                  height: theme.spacing(30),
                  objectFit: "contain",
                  pt: theme.spacing(),
                  
                  
                }}
                alt={title}
                />
                <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center" , flex:1}}>
                  <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                    <Typography varaint='h5'>{title}</Typography>
                    <Rating readOnly precision={0.5} value={rating.rate}/>
                    <form>
                      <TextField 
                    sx={{width: theme.spacing(10)}}
                    inputProps={{min:0, max:10,}}
                    variant="standard"
                    type="number"
                      label="Quantity"
                      value={quantity}
                      onChange={(e) => UpdateQuantity(e, {product, quantity})}
                      ></TextField>
                    </form>
                  </Box>
                  <Box>
                    <Typography varaint='h5' paragraph>
                      {getSubTotal([{product, quantity}])?.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid item container md={4} sx={{display: "flex",
      justifyContent:"center"
      }}
      >
        <Box sx={{width:"100%", ml:3}}>
          <Card sx={{
            padding:2,
            display:"flex",
            flexDirection:"column",
            gap: 2,
          }}>
          <Typography variant='h4'>SubTotal</Typography>
          <Typography variant='h5'>{subtotal}</Typography>
          {subtotal > 0 ? (<Button variant='contained' onClick={checkoutItems}>Buy now</Button> 
          ) : (
          <Button variant='contained' onClick={goToHome}>Shop products</Button>)}
          </Card>
        </Box>
          </Grid>
      </Grid>
    </Container>
  )
}
