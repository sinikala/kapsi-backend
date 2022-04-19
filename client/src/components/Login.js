import React from 'react'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Box, Typography
} from '@mui/material'

import theme from '../theme/theme'
import { login } from '../services/login'
import Error from './Error'
import { setUser } from '../state/user'


const boxStyle = {
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
}

const buttonStyle = {
  background: theme.palette.primary.main,
  color: 'white',
  padding: 5,
  margin: 5,
  borderRadius: 5,
}

const fieldStyle = {
  padding: 5,
  margin: 10
}


const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username:
    yup
      .string()
      .min(3, 'Username must contain at least 3 characters')
      .max(20, 'Username can contain up to 20 characters')
      .required('Username is required'),
  password:
    yup
      .string()
      .min(3, 'Password must contain at least 3 characters')
      .required('Password is required'),
})



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
      resetForm()
      navigate('/')

      //optio tunnusten luomiselle

    } catch (exception) {
      setServerError('Virheelliset tunnukset')
      setTimeout(() => {
        setServerError('')
      }, 5000)
    }
  }

  return (
    <Box sx={boxStyle}>
      <Typography variant='h5'>
        Kirjaudu sisään
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <Box >
              <Field name="username" type='text' placeholder='Käyttäjätunnus' style={fieldStyle} />
              {errors.username && touched.username
                ? <Error message={errors.username} />
                : null}
            </Box>
            <Box >
              <Field name="password" type='password' placeholder='Salasana' style={fieldStyle} />
              {errors.password && touched.password
                ? <Error message={errors.password} />
                : null}
            </Box>
            <button type='submit' style={buttonStyle}>Kirjaudu</button>
          </Form>
        )}
      </Formik>
      {serverError &&
        <Error message={serverError} />
      }
    </Box>
  )
}

export default Login