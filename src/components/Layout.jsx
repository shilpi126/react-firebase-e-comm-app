import React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const theme = createTheme({
    palette: {
        mode: "light",
    },
})

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <main><Outlet/></main> 
        {/* we use outlet for neasted route */}
        <footer></footer>
    </ThemeProvider>
  )
}
