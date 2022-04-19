import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
}

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to='/' style={linkStyle}>
              <Typography
                variant='h3'>
                KAPSI
              </Typography>
            </Link>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link to='/login' style={linkStyle}>
            <Typography variant='button'>
              Kirjaudu
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar