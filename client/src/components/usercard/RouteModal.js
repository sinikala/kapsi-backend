/*eslint-disable*/
import { useSelector, useDispatch } from 'react-redux'
import { Box, Modal, Typography } from '@mui/material'
import RouteForm from './RouteForm'
import { createRoute } from '../../services/userParkService'
import { addVisitedParkRoute } from '../../state/visitedParks'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  overflow: 'scroll',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

}


const RouteModal = ({ open, setOpen, parkNoteId }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const park = useSelector(state => state.activePark)

  const handleClose = (event, reason) => {
    if (reason && reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleSave = async (values) => {
    //luvut tulevat stringinä

    const newRoute = await createRoute({
      name: values.name,
      length: values.len ? parseFloat(values.len.replace(',', '.')) : '',
      duration: values.duration ? parseFloat(values.duration.replace(',', '.')) : '',
      visitedIn: values.visitedIn,
      difficulty: parseFloat(values.difficulty),
      scenery: parseFloat(values.scenery),
      facilities: parseFloat(values.facilities),
      comment: values.comment,
      parkId: park.id,
      visitedParkId: parkNoteId
    }, user.token)

    console.log(values)
    console.log('new', newRoute)
    dispatch(addVisitedParkRoute({ id: parkNoteId, route: newRoute }))

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
        <Typography id="modal-modal-title" variant="h6" component="h2" color='primary'>
          {park.label}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom={true}>
          Tallenna kulkemasi reitti
        </Typography>
        <RouteForm handleCancel={handleCancel} handleSave={handleSave} />
      </Box>
    </Modal>
  )
}

export default RouteModal