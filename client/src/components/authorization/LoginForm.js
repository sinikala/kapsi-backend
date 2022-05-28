import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import {
  Box,
} from '@mui/material'

import theme from '../../theme/theme'
import Error from '../Error'

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
      .max(30, 'Username can contain up to 30 characters')
      .required('Username is required'),
  password:
    yup
      .string()
      .min(3, 'Password must contain at least 3 characters')
      .required('Password is required'),
})



const LoginForm = ({ handleLogin }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form>
          <Box >
            <Field id='username' name="username" type='text' placeholder='Käyttäjätunnus' style={fieldStyle} />
            {errors.username && touched.username
              ? <Error message={errors.username} />
              : null}
          </Box>
          <Box >
            <Field id='password' name="password" type='password' placeholder='Salasana' style={fieldStyle} />
            {errors.password && touched.password
              ? <Error message={errors.password} />
              : null}
          </Box>
          <button id='login-button' type='submit' style={buttonStyle}>Kirjaudu</button>
        </Form>
      )}
    </Formik>
  )
}






export default LoginForm