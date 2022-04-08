import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Container, Divider, Card, CardMedia, Typography, } from '@mui/material'

import theme from '../theme/theme';

const containerStyle = {
  backgroundColor: theme.palette.secondary.main,
  border: 2,
  borderColor: theme.palette.primary.main,
  borderRadius: 3,
  padding: 2,
}


const ParkInfo = () => {
  const park = useSelector(state => state.activePark)
  const [showCredit, setShowCredit] = useState(false);


  if (park) {
    return (
      <Container sx={containerStyle}>
        <Typography color='primary' variant='h4' gutterBottom={true}>
          {park.label}
        </Typography>
        <Divider variant="middle" ></Divider>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          Sijainti: {park.locatedInLabel}
        </Typography>
        <Typography color='primary' variant='subtitle' component="div" gutterBottom={true}>
          Perustettu: {park.inceptionYear}
        </Typography>
        <Card >
          <CardMedia
            component="img"
            height="140"
            image={park.image}
            alt="park image"
            onMouseOver={() => setShowCredit(true)}
            onMouseOut={() => setShowCredit(false)}
          />
        </Card>
        {showCredit &&
          <Typography color='primary' variant='caption'>
            Source: http://commons.wikimedia.org/
          </Typography>
        }
      </Container>
    )
  }
  else {
    return (
      <Container>
        <Typography color='primary' variant='h6' component="div" gutterBottom={true}>
          Valitse kansallispuisto kartalta
        </Typography>
      </Container>
    )
  }


}

export default ParkInfo

//park, locatedInLabel,coordinates, label, image, inceptionYear: 