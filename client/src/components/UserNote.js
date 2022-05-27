import { useSelector } from 'react-redux'
import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import PlanModal from './PlanModal'
import VisitModal from './VisitModal'


const containerStyle = {
  padding: 2,
  width: '80%',
}


const UserNote = () => {
  //const navigate = useNavigate()
  const [planOpen, setPlanOpen] = useState(false)
  const [visitOpen, setVisitOpen] = useState(false)

  const park = useSelector(state => state.activePark)
  const parkNote = useSelector(state => state.visitedParks.filter(visited => visited.park === park.id))[0]
  const parkPlan = useSelector(state => state.plannedParks.filter(planned => planned.park === park.id))[0]
  //console.log('parknote', parkNote)



  const handlePlanClick = () => {
    setPlanOpen(true)
    //navigate(`/planvisit/${park.label}`)
  }

  const handleVisitedClick = () => {
    setVisitOpen(true)
    //navigate(`/parknotes/${park.label}`)
  }

  // no notes at all
  if (!parkNote && !parkPlan) {
    return (
      <Box sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
        marginLeft: 5,
        marginTop: 3,
      }}>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
          style={{ alignItems: 'flex-start' }}
        >
          <Button key="addVisited" onClick={handleVisitedClick}>
            <AddBoxIcon sx={{ margin: 1 }} /> Merkitse puisto käydyksi
          </Button>
          <Button key="addPlanned" onClick={handlePlanClick}>
            <AddBoxIcon sx={{ margin: 1 }} /> Tallenna muistiinpanoja vielä käymättömästä puistosta
          </Button>
        </ButtonGroup>
        <PlanModal open={planOpen} setOpen={setPlanOpen} park={park} />
        <VisitModal open={visitOpen} setOpen={setVisitOpen} park={park} />
      </Box>
    )
  }

  // plan for park
  if (!parkNote && parkPlan) {
    return (
      <Box sx={containerStyle}>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          Ei vierailtu
        </Typography>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          Muistiinpanosi tulevaa vierailua varten:
        </Typography>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true} align='center'>
          {parkPlan.comment}
        </Typography>
      </Box>
    )
  }

  //park visited
  return (
    <Box sx={containerStyle}>

      <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
        Vierailtu {parkNote.visitedIn}
      </Typography>
      <Typography color='primary' variant='subtitle' component="div" >
        Muistiinpanot
      </Typography>
      {parkNote.comments.length > 0
        ? parkNote.comments.map(comment => <li key={comment._id}>{comment.comment}  ({new Date(comment.createdAt).toLocaleDateString('de-DE')})</li>)
        : <Typography color='primary' variant='subtitle' component="div" >
          Luo muistiinpano
        </Typography>
      }
      <Typography color='primary' variant='subtitle' component="div" >
        Käydyt reitit
      </Typography>
      {parkNote.routes.length > 0
        ? parkNote.routes.map(route => <li key={route.id}>{route.name} </li>)
        : <Typography color='primary' variant='subtitle' component="div" >
          Luo uusi reitti
        </Typography>
      }
    </Box>

  )

}

export default UserNote