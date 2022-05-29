import { useSelector, useDispatch } from 'react-redux'
import { Box, Modal, Typography } from '@mui/material'
import VisitForm from './VisitForm'
import { createVisit } from '../../services/userParkService'
import { addVisitedPark } from '../../state/visitedParks'

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


const VisitModal = ({ open, setOpen, park }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleClose = (event, reason) => {
    if (reason && reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleSave = async (values) => {
    const parkVisit = await createVisit({
      visitedIn: values.visitedIn,
      comment: values.comment,
      parkId: park.id
    }, user.token)
    dispatch(addVisitedPark(parkVisit))
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom={true}>
          Luo muistiinpano puistovierailustasi
        </Typography>
        <VisitForm handleCancel={handleCancel} handleSave={handleSave} />
      </Box>
    </Modal>
  )
}

export default VisitModal