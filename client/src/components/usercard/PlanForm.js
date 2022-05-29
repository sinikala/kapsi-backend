import { Box } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import theme from '../../theme/theme'
import Error from '../Error'


const validationSchema = yup.object().shape({
  comment:
    yup
      .string()
      .min(3, 'Muistiinpanon täytyy olla vähintään 3 merkkiä pitkä')
      .required('Muistiinpano vaaditaan'),
})

const buttonStyle = {
  color: 'white',
  padding: 5,
  margin: 5,
  borderRadius: 5,
}

const fieldStyle = {
  padding: 5,
  margin: 10,
  width: '80%'
}


const PlanForm = ({ handleCancel, handleSave }) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSave}
      onReset={handleCancel}
    >
      {({ errors, touched }) => (
        <Form>
          <Box >
            <Field id='comment' name='comment' style={fieldStyle} component='textarea' rows='10' />
            {errors.comment && touched.comment
              ? <Error message={errors.comment} />
              : null}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button id='cancel' type='reset' style={{ background: theme.palette.error.main, ...buttonStyle }}>Peruuta</button>
            <button id='save' type='submit' style={{ background: theme.palette.primary.main, ...buttonStyle }}>Tallenna</button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default PlanForm