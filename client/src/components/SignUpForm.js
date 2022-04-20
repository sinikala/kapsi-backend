import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import {
  Box
} from '@mui/material'

import theme from '../theme/theme'
import Error from './Error'


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



const SignUpForm = ({ handleSignUp }) => {

  return (
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

  )
}

export default SignUpForm