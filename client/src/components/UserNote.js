import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'




const containerStyle = {
  //backgroundColor: theme.palette.secondary.main,
  //border: 2,
  //borderColor: theme.palette.primary.main,
  //borderRadius: 3,
  padding: 2,
  width: '80%'
}





const UserNote = () => {
  const park = useSelector(state => state.activePark)
  const parkNote = useSelector(state => state.visitedParks.filter(visited => visited.park === park.id))[0]
  const parkPlan = useSelector(state => state.plannedParks.filter(planned => planned.park === park.id))[0]
  //console.log('parknote', parkNote)

  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  if (!parkNote && !parkPlan) {
    return (
      <FormControl>
        <FormLabel id="new-note-radio-buttons">Sinulla ei vielä ole muistiinpanoja tästä puistosta.</FormLabel>
        <RadioGroup
          name="new-note-buttons"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="newNote" control={<Radio />} label="Merkitse puisto käydyksi ja luo muistiinpanoja" />
          <FormControlLabel value="plan" control={<Radio />} label="Suunnittele vierailuasi" />
        </RadioGroup>
      </FormControl>
    )
  }

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

  return (
    <Box sx={containerStyle}>

      <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
        Vierailtu {parkNote.visitedIn}
      </Typography>
      <Typography color='primary' variant='subtitle' component="div" >
        Muistiinpanot
      </Typography>
      {parkNote.comments.length > 0
        ? parkNote.comments.map(comment => <li key={comment._id}>{comment.comment}  ({comment.createdAt})</li>)
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