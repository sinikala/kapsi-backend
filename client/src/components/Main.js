import React from 'react'
import { Grid, Stack } from '@mui/material'

import Map from './map-general/Map'
import ParkInfo from './map-general/ParkInfo'
import UserParkCard from './usercard/UserParkCard'

const gridStyle = {
  padding: 2,
  //marginRight: 4,
  //marginLeft: 4
}

const Main = () => {
  return (
    <Grid container spacing={1} sx={gridStyle}>
      <Grid item xs={6} md={6}>
        <Map />
      </Grid>
      <Grid item xs={6} md={6} >
        <Stack spacing={2}>
          <ParkInfo />
          <UserParkCard />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Main