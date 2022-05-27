import { Box, Modal, Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import theme from '../theme/theme'
import Error from './Error'
import { savePlan } from '../services/userParkService'
import { addPlannedPark } from '../state/plannedParks'

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


const PlanModal = ({ open, setOpen, park }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  const handleClose = (event, reason) => {
    if (reason && reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleSave = async (values) => {
    const parkPlan = await savePlan({
      comment: values.comment,
      parkId: park.id
    }, user.token)

    dispatch(addPlannedPark(parkPlan))
    console.log('tulos', parkPlan)
    setOpen(false)

  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {park.label}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Kirjaa tähän suunnitelmiasi, kuulemiasi vinkkejä tai muuta vastaavaa ensimmäistä puistokäyntiäsi odotellessa.
        </Typography>
        <PlanForm handleCancel={handleCancel} handleSave={handleSave} />
      </Box>

    </Modal>
  )
}


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




export default PlanModal