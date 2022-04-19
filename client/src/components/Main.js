import React from 'react'
import { Grid, } from '@mui/material'

import Map from './Map'
import ParkInfo from './ParkInfo'

const gridStyle = {
  padding: 2
}

const Main = () => {
  return (
    <Grid container spacing={1} sx={gridStyle}>
      <Grid item xs={6} md={8}>
        <Map />
      </Grid>
      <Grid item xs={6} md={4}>
        <ParkInfo />
      </Grid>
    </Grid>
  )
}

export default Main