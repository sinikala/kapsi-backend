import React, { useState } from 'react'
import { useSelector } from 'react-redux'
//import { Card, CardContent, CardHeader, IconButton, Typography, } from '@mui/material'
import { Box, Tab, Tabs, Typography } from '@mui/material'
//import EditIcon from '@mui/icons-material/Edit'


import theme from '../theme/theme'
import UserNote from './UserNote'
import ParkComments from './ParkComments'



const containerStyle = {
  border: 2,
  borderColor: theme.palette.primary.main,
  borderRadius: 3,
  padding: 2,
  width: '100%'
}



const UserParkCard = () => {
  const activePark = useSelector(state => state.activePark)
  const loggedUser = useSelector(state => state.user)
  const [value, setValue] = useState('notes')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  if (activePark) {
    return (
      <Box sx={containerStyle}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="notes" label='Muistiinpanot' wrapped />
          <Tab value="comments" label="Kommentit" wrapped />
        </Tabs>
        {loggedUser
          ? value === 'notes'
            ? <UserNote />
            : <ParkComments />
          : <Typography color='primary' variant='caption' component="div" gutterBottom={true}>
            <br />
            Kirjaudu sisään selataksesi muistiinpanoja ja kommentteja.
          </Typography>
        }
      </Box>
    )
  }
  return (
    <div></div>
  )
}

export default UserParkCard

{/* <Card sx={containerStyle}>
<CardHeader
  title='Muistiinpanot'
  titleTypographyProps={{
    variant: 'h4',
    color: 'primary',
    gutterBottom: true
  }}
  action={
    <IconButton aria-label='close' onClick={() => { navigate(`/parknote/${activePark.label}`) }}>
      <EditIcon />
    </IconButton>
  }
/>
<CardContent>
  <Typography variant='subtitle' color='primary' component="div" gutterBottom={true}>
    hei
  </Typography>
</CardContent>
</Card> */}