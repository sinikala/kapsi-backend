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
import { login, signUp } from '../services/authorization'
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
  name: '',
  password: '',
  passwordConfirm: ''
}

const validationSchema = yup.object().shape({
  username:
    yup
      .string()
      .min(3, 'Username must contain at least 3 characters')
      .max(30, 'Username can contain up to 30 characters')
      .required('Username is required'),
  name:
    yup
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(60, 'Name can contain up to 60 characters')
      .required('Name is required'),
  password:
    yup
      .string()
      .min(3, 'Password must contain at least 3 characters')
      .required('Password is required'),
  passwordConfirm:
    yup
      .string()
      // eslint-disable-next-line quotes
      .oneOf([yup.ref('password'), null], "Password and password confirm don't match")
      .required('Password confirmation is required')
})



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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
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
              <Field name="name" type='text' placeholder='Nimi' style={fieldStyle} />
              {errors.name && touched.name
                ? <Error message={errors.name} />
                : null}
            </Box>
            <Box >
              <Field name="password" type='password' placeholder='Salasana' style={fieldStyle} />
              {errors.password && touched.password
                ? <Error message={errors.password} />
                : null}
            </Box>
            <Box >
              <Field name="passwordConfirm" type='password' placeholder='Toista salasana' style={fieldStyle} />
              {errors.passwordConfirm && touched.passwordConfirm
                ? <Error message={errors.passwordConfirm} />
                : null}
            </Box>
            <button type='submit' style={buttonStyle}>Luo tunnukset</button>
          </Form>
        )}
      </Formik>
      {serverError &&
        <Error message={serverError} />
      }
    </Box>
  )
}

export default SignUp