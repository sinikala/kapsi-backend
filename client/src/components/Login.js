import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Box, Grid, Typography
} from '@mui/material'

import { login } from '../services/authorization'
import { getUserNotes } from '../services/notes'
import Error from './Error'
import { setUser } from '../state/user'
import { setNotes } from '../state/notes'
import LoginForm from './LoginForm'


const boxStyle = {
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
}


const Login = () => {
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (values, { resetForm }) => {
    try {
      const user = await login(values)
      console.log('user', user)
      dispatch(setUser(user))
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      const notes = await getUserNotes(user.token)
      dispatch(setNotes(notes))
      resetForm()
      navigate('/')

    } catch (exception) {
      if (exception.response.status === 500) {
        setServerError('Ongelma palvelimella, yritä myöhemmin uudelleen')
      } else {
        setServerError('Virheelliset tunnukset')
      }
      console.log('error', exception)
      setTimeout(() => {
        setServerError('')
      }, 5000)
    }
  }

  return (
    <Box sx={boxStyle}>
      <Grid container spacing={14}>
        <Grid item >
          <Typography variant='h5'>
            Kirjaudu sisään
          </Typography>
        </Grid>
        <Grid item >
          <Link id='signup-link' to='/signup'>
            <Typography variant='subtitle1'>
              Luo uudet käyttäjätunnukset
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <LoginForm handleLogin={handleLogin} />
      {
        serverError &&
        <Error message={serverError} />
      }
    </Box >
  )
}

export default Login