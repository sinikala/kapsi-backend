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
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={gridStyle}>
      <Grid item xs >
        <Map />
      </Grid>
      <Grid item xs >
        <Stack spacing={2}>
          <ParkInfo />
          <UserParkCard />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Main