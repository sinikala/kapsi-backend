import { Box, Modal, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import PlanForm from './PlanForm'
import { createPlan } from '../../services/userParkService'
import { addPlannedPark } from '../../state/plannedParks'

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
    const parkPlan = await createPlan({
      comment: values.comment,
      parkId: park.id
    }, user.token)
    dispatch(addPlannedPark(parkPlan))
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


export default PlanModal