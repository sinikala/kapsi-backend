import { useSelector, useDispatch } from 'react-redux'
import { Box, Modal, Typography } from '@mui/material'
import CommentForm from './CommentForm'
import { addVisitComment } from '../../services/userParkService'
import { addVisitedParkComment } from '../../state/visitedParks'


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


const AddCommentModal = ({ open, setOpen, parkNoteId }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const park = useSelector(state => state.activePark)

  const handleClose = (event, reason) => {
    if (reason && reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleSave = async (values) => {
    const parkVisit = await addVisitComment(
      parkNoteId,
      { comment: values.comment },
      user.token)

    dispatch(addVisitedParkComment(parkVisit))
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
          Lisää muistiinpano
        </Typography>
        <CommentForm handleCancel={handleCancel} handleSave={handleSave} />
      </Box>
    </Modal>
  )
}

export default AddCommentModal