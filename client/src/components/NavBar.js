import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'




const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h3' sx={{ flexGrow: 1 }}>
            KAPSI
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Kirjaudu</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar