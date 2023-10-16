import { CardActions, CardContent, CardMedia, Rating, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import {Container} from '@mui/material';
import {Grid} from '@mui/material';
import {Button} from '@mui/material'
import {Card} from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { ThemeContext } from '@emotion/react';
import { addToCart } from '../features/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../features/products-slice';
import { useSearchParams } from 'react-router-dom';
//import { useSearchParams } from 'react-router-dom';





export default function Home() {
   const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const theme = useTheme();
    const state = useSelector(state => state.products)
    const {value:products, loading} = state ?? {};
    const dispatch = useDispatch();
    const searchTerm = searchParams.get('searchTerm');

    

    if(!products?.length){
        dispatch(fetchAllProducts())
    }



    function addProductToCart(product){
        //dispatch on action
        dispatch(addToCart({product, quantity:1}))
        // console.log('function is called');
    }

    let filteredProducts = category && category !== 'all'?
    products.filter(prod => prod.category === category):products;
    

    filteredProducts = searchTerm ? filteredProducts.filter((prod) => prod.title.toLowerCase().includes(searchTerm.toLowerCase())):filteredProducts;





return (
    <Container sx={{py:8}} maxWidth='lg'>
        <Grid container  spacing={4}>
        {
            filteredProducts?.map(({title, id, price, description, rating, image}) => {
                return(
            <Grid item key={id} xs={12} sm={6} md={3}>
                <Card sx={{height:"100%", display:"flex", flexDirection:"column", padding:theme.spacing(2, 0)}}>
                    <CardMedia component='img' sx={{alignSelf:'center', width: theme.spacing(30), height:theme.spacing(30), objectFit:'contain', pt:theme.spacing()}} image={image} alt={title}/>
                    <CardContent>
                        <Typography variant='h5' component='h2' gutterBottom 
                        sx={{ 
                        overflow :"hidden",
                        textOverflow :'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp:'1',
                        WebkitBoxOrient:'vertical',
                    }}
                    
                        >
                        {title}
                        </Typography>
                        <Typography 
                        paragraph
                        color='text.secondry'
                        sx={{ 
                        overflow :"hidden",
                        textOverflow :'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp:'2',
                        WebkitBoxOrient:'vertical',
                    }}
                    >{description}
                    </Typography>
                        <Typography fontSize='large' paragraph>{price}</Typography>
                        <Rating readOnly precision={0.5} value={rating.rate}/>
                    </CardContent>
                    <CardActions sx={{WebkitJustifyContent: 'center'}}   >
                        <Button variant='contained' onClick = {() => addProductToCart({title, id, price, description, rating, image})}>
                        <ShoppingCart />
                            Add To Cart
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
                
                )
            })
        }
        </Grid>
    </Container>
)
}
