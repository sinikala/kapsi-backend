/*eslint-disable*/
import { useFormik, } from 'formik'
import { Box, Button, Rating, TextField, InputAdornment, Typography } from '@mui/material'
import * as yup from 'yup'
import theme from '../../theme/theme'


const validationSchema = yup.object().shape({
  name:
    yup
      .string()
      .required('Nimeä reitti'),
  len:
    yup
      .number()
      .transform((_value, originalValue) => Number(originalValue.replace(/,/, '.')))
      .min(0, 'Reitin pituus ei voi olla negatiivinen')
      .typeError('Ilmoita pituus numeroina (kilometreissä)')
      .required('Ilmoita reitin pituus (km)'),
  duration:
    yup
      .number()
      .transform((_value, originalValue) => Number(originalValue.replace(/,/, '.')))
      .min(0, 'Reitin kesto ei voi olla negatiivinen')
      .typeError('Ilmoita kesto numerona (tuntia)'),
  visitedIn:
    yup
      .string(),
  difficulty:
    yup
      .string(),
  scenery:
    yup
      .string(),
  facilities:
    yup
      .string(),
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

const ratingStyle = {
  sx: {
    color: theme.palette.primary.main,
  },
  size: 'large',
  precision: 0.5
}

const ratingBoxStyle = {
  width: '50%',
  padding: 1,
  margin: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}


const RouteForm = ({ handleCancel, handleSave }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      len: '',
      duration: '',
      visitedIn: '',
      difficulty: 0,
      scenery: 0,
      facilities: 0,
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
        id='name'
        name='name'
        label='Reitin nimi*'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        style={fieldStyle}
      />
      <TextField
        fullWidth
        id='len'
        name='len'
        label='Pituus'
        value={formik.values.len}
        onChange={formik.handleChange}
        error={formik.touched.len && Boolean(formik.errors.len)}
        helperText={formik.touched.len && formik.errors.len}
        style={fieldStyle}
        InputProps={{
          endAdornment: <InputAdornment position='end'>km</InputAdornment>,
        }}
      />
      <TextField
        fullWidth
        id='duration'
        name='duration'
        label='Kesto'
        value={formik.values.duration}
        onChange={formik.handleChange}
        error={formik.touched.duration && Boolean(formik.errors.duration)}
        helperText={formik.touched.duration && formik.errors.duration}
        style={fieldStyle}
        InputProps={{
          endAdornment: <InputAdornment position='end'>tuntia</InputAdornment>,
        }}
      />
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
      <Box sx={ratingBoxStyle}>
        <Typography component='label'> Haastavuus</Typography>
        <Rating
          id='difficulty'
          name='difficulty'
          value={formik.values.difficulty}
          onChange={formik.handleChange}
          {...ratingStyle}
        />
      </Box>
      <Box sx={ratingBoxStyle}>
        <Typography component='label'> Maisemat</Typography>
        <Rating
          id='scenery'
          name='scenery'
          value={formik.values.scenery}
          onChange={formik.handleChange}
          {...ratingStyle}
        />
      </Box>
      <Box sx={ratingBoxStyle}>
        <Typography component='label'> Fasiliteetit</Typography>
        <Rating
          id='facilities'
          name='facilities'
          label='Haastavuus'
          value={formik.values.facilities}
          onChange={formik.handleChange}
          {...ratingStyle}
        />
      </Box>
      <TextField
        fullWidth
        multiline
        id='comment'
        name='comment'
        label='Muistiinpanot'
        rows={4}
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

export default RouteForm
