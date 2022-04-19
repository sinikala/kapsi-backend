import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../state/user'
import { useNavigate } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
}

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
  const user = useSelector(state => state.user)

  if (loggedUserJSON && !user) {
    dispatch(setUser(JSON.parse(loggedUserJSON)))
  }


  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedAppUser')
    navigate('/')
  }



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

          {(!loggedUserJSON)
            ? <Link to='/login' style={linkStyle}>
              <Typography variant='button'>
                Kirjaudu
              </Typography>
            </Link>
            : <Button color='info' onClick={handleLogout} >
              Kirjaudu ulos
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar