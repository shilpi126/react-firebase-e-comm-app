import React from 'react'
import { Avatar, Box, Container, CssBaseline, FormControl,  Grid,  TextField, Typography, useTheme } from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {Button} from '@mui/material'

import {Form, Link, useNavigate} from "react-router-dom";
import { useAuth } from '../firebase/Auth';

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function login (event){
    event.preventDefault();
    const {email, password} = event.target;
    await signIn (email.value, password.value);
    navigate("/")
  }


  return (
    
    <Container component={"main"} maxWidth="xs">
      <CssBaseline>
        <Box
        sx={{
          mt: theme.spacing(8),
          
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
        }}
        >
          <Avatar sx={{
            m:1,
            backgroundColor: theme.palette.secondary.main,
          }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component={"h1"} variant="h5">
            Sign In
          </Typography>
          <Form
          onSubmit = {login}
          sx={{width: "100%",
          mt:1,
        }}
          >
          <TextField
          labei="Email" 
          variant='outlined'
          margin='normal'
          required
          fullWidth
          autoFocus
          id="email"
          name="email"
          autoComplete='off'
          type="email"
          >
          
          </TextField>
          <TextField 
          label="Password"
          variant='outlined'
          margin='normal'
          required
          fullWidth
          autoFocus
          id="password"
          name="password"
          autoComplete='current-password'
          type="password"
          >

          </TextField>

          <Button type="submit" 
          variant="contained"  
          fullWidth 
          color="primary"
          sx={{
            margin: theme.spacing(3, 0, 2),
          }}
          
          >Sign In
          </Button>

          </Form>
          <Grid container justifyContent={'flex-end'}>
                    <Grid item>
                        <Link  variant="body2" to='/register'>
                            New User? Sign Up
                        </Link>
                    </Grid>
                </Grid>
        </Box>
      </CssBaseline>
    </Container>
  )
}
