import React, { useState } from 'react'
import { useSelector } from 'react-redux'
//import { Card, CardContent, CardHeader, IconButton, Typography, } from '@mui/material'
import { Box, Tab, Tabs, Typography } from '@mui/material'

import theme from '../../theme/theme'
import UserNote from './UserNotes'
import ParkComments from './ParkReviews'


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
