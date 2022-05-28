import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import theme from '../../theme/theme'
import { setActivePark } from '../../state/activePark'

const containerStyle = {
  //backgroundColor: theme.palette.secondary.main,
  border: 2,
  borderColor: theme.palette.primary.main,
  borderRadius: 3,
  padding: 2,
}


const ParkInfo = () => {
  const dispatch = useDispatch()
  const park = useSelector(state => state.activePark)
  const [showCredit, setShowCredit] = useState(false)


  if (park) {
    return (
      <Card sx={containerStyle}>
        <CardHeader
          title={park.label}
          titleTypographyProps={{
            variant: 'h4',
            color: 'primary',
            gutterBottom: true
          }}
          action={
            <IconButton aria-label='close' onClick={() => { dispatch(setActivePark(null)) }}>
              <CloseRoundedIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant='subtitle' component="div" gutterBottom={true}>
            Sijainti: {park.locatedInLabel}
          </Typography>

          <Typography variant='subtitle' component="div" gutterBottom={true}>
            Perustettu: {park.inceptionYear}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          style={{
            maxHeight: '240px',
            width: '100%'
          }}
          image={park.image}
          alt="park image"
          onMouseOver={() => setShowCredit(true)}
          onMouseOut={() => setShowCredit(false)}
        />
        {showCredit &&
          <Typography color='primary' variant='caption'>
            Source: http://commons.wikimedia.org/
          </Typography>
        }
      </Card>
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

//          <Divider variant="middle" ></Divider>
