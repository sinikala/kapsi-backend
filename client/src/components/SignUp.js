import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Box, Typography
} from '@mui/material'

import { login, signUp } from '../services/authorization'
import Error from './Error'
import { setUser } from '../state/user'
import SignUpForm from './SignUpForm'


const boxStyle = {
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
}


const SignUp = () => {
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async (values, { resetForm }) => {
    const { username, name, password } = values

    try {
      const createdUser = await signUp({ username: username, name: name, password: password })
      console.log('user', createdUser)

      const user = await login({ username: createdUser.username, password: password })
      dispatch(setUser(user))
      window.localStorage.removeItem('loggedAppUser')
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      resetForm()
      navigate('/')

    } catch (exception) {
      setServerError('Käyttäjänimi varattu')
      setTimeout(() => {
        setServerError('')
      }, 5000)
    }
  }

  return (
    <Box sx={boxStyle}>
      <Typography variant='h5'>
        Luo käyttäjätunnukset
      </Typography>
      <SignUpForm handleSignUp={handleSignUp} />
      {serverError &&
        <Error message={serverError} />
      }
    </Box>
  )
}

export default SignUp