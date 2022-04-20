import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, IconButton, Typography, } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

import theme from '../theme/theme'



const containerStyle = {
  backgroundColor: theme.palette.secondary.main,
  border: 2,
  borderColor: theme.palette.primary.main,
  borderRadius: 3,
  padding: 2,
}



const UserParkCard = () => {
  const navigate = useNavigate()
  const activePark = useSelector(state => state.activePark)


  if (activePark) {
    return (
      <Card sx={containerStyle}>
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
      </Card>
    )
  }
  return (
    <div></div>
  )
}

export default UserParkCard