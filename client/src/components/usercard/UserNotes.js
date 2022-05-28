import { useSelector } from 'react-redux'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useState } from 'react'
import VisitedParkDetails from './VisitedParkDetails'
import PlanModal from './PlanModal'
import VisitModal from './VisitModal'


const containerStyle = {
  padding: 2,
  width: '80%',
}

const boxStyle = {
  display: 'flex',
  '& > *': {
    m: 1,
  },
  marginLeft: 5,
  marginTop: 3,
}

const UserNote = () => {
  const [planOpen, setPlanOpen] = useState(false)
  const [visitOpen, setVisitOpen] = useState(false)

  const park = useSelector(state => state.activePark)
  const parkNote = useSelector(state => state.visitedParks.filter(visited => visited.park === park.id))[0]
  const parkPlan = useSelector(state => state.plannedParks.filter(planned => planned.park === park.id))[0]


  const handlePlanClick = () => {
    setPlanOpen(true)
    //navigate(`/planvisit/${park.label}`)
  }

  const handleVisitedClick = () => {
    setVisitOpen(true)

  }

  // no notes at all
  if (!parkNote && !parkPlan) {
    return (
      <Box sx={boxStyle}>
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

  // plan for park exists
  if (!parkNote && parkPlan) {
    return (
      <Box sx={containerStyle}>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          - Ei vierailtu -
        </Typography>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          Muistiinpanosi tulevaa vierailua varten:
        </Typography>
        <Divider variant='middle' />
        <Typography color='gray' variant='body2' component="div" gutterBottom={true} >
          <i>Muokattu {new Date(parkPlan.editedAt).toLocaleDateString('de-DE')}</i>
        </Typography>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true} align='center'>
          {parkPlan.comment}
        </Typography>
        <Divider variant='middle' />
        <Button key="addVisited" onClick={handleVisitedClick}>
          <AddBoxIcon sx={{ margin: 1 }} /> Merkitse puisto käydyksi
        </Button>
        <VisitModal open={visitOpen} setOpen={setVisitOpen} park={park} />
      </Box>
    )
  }

  // park visited
  return (
    <VisitedParkDetails parkNote={parkNote} />
  )
}

export default UserNote