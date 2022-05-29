import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../state/user'
import { setVisitedParks, setVisitedParksNull } from '../state/visitedParks'
import { setPlannedParks, setPlannedParksNull } from '../state/plannedParks'
import { useNavigate } from 'react-router-dom'
import { getAllUserParks } from '../services/userParkService'

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
}


const refetchData = async (dispatch, token, handleLogout) => {
  try {
    const { visitedParks, plannedParks } = await getAllUserParks(token)
    dispatch(setVisitedParks(visitedParks))
    dispatch(setPlannedParks(plannedParks))
  } catch (error) {
    handleLogout()
  }
}

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedUserJSON = window.localStorage.getItem('loggedAppUser')

  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedAppUser')
    dispatch(setVisitedParksNull())
    dispatch(setPlannedParksNull())
    navigate('/')
  }

  if (loggedUserJSON && !user) {
    const token = JSON.parse(loggedUserJSON).token
    try {
      refetchData(dispatch, token, handleLogout)
      dispatch(setUser(JSON.parse(loggedUserJSON)))
    } catch (error) {
      console.log(error)
    }
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
            ? <Link id='login-link' to='/login' style={linkStyle}>
              <Typography variant='button'>
                Kirjaudu
              </Typography>
            </Link>
            : <Button id='logout-button' color='info' onClick={handleLogout} >
              Kirjaudu ulos
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar