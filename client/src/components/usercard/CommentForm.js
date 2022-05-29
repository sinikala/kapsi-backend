import { useFormik, } from 'formik'
import { Box, Button, TextField } from '@mui/material'
import * as yup from 'yup'
import theme from '../../theme/theme'


const validationSchema = yup.object().shape({
  comment:
    yup
      .string()
      .required('Muistiinpano ei voi olla tyhjä'),
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


const CommentForm = ({ handleCancel, handleSave }) => {
  const formik = useFormik({
    initialValues: {
      comment: '',
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
        multiline
        id='comment'
        name='comment'
        rows={7}
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

export default CommentForm
