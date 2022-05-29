import { useFormik, } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import * as yup from 'yup'
import theme from '../../theme/theme'


const validationSchema = yup.object().shape({
  visitedIn:
    yup
      .string()
      .required('Muistiinpanolla on oltava vierailuajankohta'),
  comment:
    yup
      .string(),
})

const buttonStyle = {
  color: 'white',
  padding: 1,
  margin: 2,
  borderRadius: 1,

}

const fieldStyle = {
  padding: 5,
  margin: 10,
  width: '80%'
}


const VisitForm = ({ handleCancel, handleSave }) => {
  const formik = useFormik({
    initialValues: {
      comment: '',
      visitedIn: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values => {
      handleSave(values)
    }),
    onReset: handleCancel
  })

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <TextField
        fullWidth
        id='visitedIn'
        name='visitedIn'
        label='Vierailuajankohta'
        value={formik.values.visitedIn}
        onChange={formik.handleChange}
        error={formik.touched.visitedIn && Boolean(formik.errors.visitedIn)}
        helperText={formik.touched.visitedIn && formik.errors.visitedIn}
        style={fieldStyle}
      />
      <TextField
        fullWidth
        id='comment'
        name='comment'
        label='Muistiinpanot'
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
        style={fieldStyle}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button id='cancel' sx={{ background: theme.palette.error.main, ...buttonStyle }} type='reset'>
          Peruuta
        </Button>
        <Button id='save' sx={{ background: theme.palette.primary.main, ...buttonStyle }} type='submit'>
          Tallenna
        </Button>
      </Box>
    </form>
  )
}

export default VisitForm
