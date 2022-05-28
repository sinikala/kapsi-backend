/* eslint-disable */
import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Rating, Stack, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import theme from '../../theme/theme'


const containerStyle = {
  padding: 2,
  width: '100%',
}

const boxStyle = {
  border: 1,
  borderColor: theme.palette.primary.main,
  borderRadius: 3,
  padding: 2,
  marginBottom: 1,
  width: '80%'
}

const VisitedParkDetails = ({ parkNote }) => {

  return (
    <Box sx={containerStyle}>
      <Accordion defaultExpanded={true} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Vierailtu
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {parkNote.visitedIn}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Muistiinpanot</Typography>
          {parkNote.comments.length === 0
            ? <Typography color='gray' variant='body2'>
              Ei muistiinpanoja
            </Typography>
            : <Typography color='gray' variant='body2'>
              {parkNote.comments.length}
            </Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <Comments comments={parkNote.comments} />
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Reitit
          </Typography>
          {parkNote.routes.length === 0
            ? <Typography color='gray' variant='body2'>
              Ei tallennettuja reittejä
            </Typography>
            : <Typography color='gray' variant='body2'>
              {parkNote.routes.length}
            </Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <Routes routes={parkNote.routes} />
        </AccordionDetails>
      </Accordion>


    </Box>
  )
}

export default VisitedParkDetails



const Comments = ({ comments }) => {

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton aria-label='add' color='primary' key="addComment" onClick={() => { }}>
          <AddBoxIcon />
        </IconButton>
      </Box>
      {comments.length === 0
        ? <Typography color='grey' variant='subtitle' component="div" >
          Ei muistiinpanoja
        </Typography>
        : comments.map(comment =>
          <Stack key={comment._id} sx={boxStyle} >
            <Typography color='gray' variant='body2' component="div" align='right'>
              <i>Luotu {new Date(comment.createdAt).toLocaleDateString('de-DE')}</i>
              <IconButton aria-label='edit' size='small' color='primary' onClick={() => { }}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Typography>
            <Typography variant='body' component="div" >
              {comment.comment}
            </Typography>
          </Stack>
        )
      }
    </Box>
  )
}


const Routes = ({ routes }) => {
  return (

    <Box sx={containerStyle}>
      {routes.map(route =>

        <Accordion key={route.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography color='primary' sx={{ width: '33%', flexShrink: 0 }}>
              <b>{route.name}</b>
            </Typography>
            <Typography color='gray' variant='body2'>
              {route['length']} km
            </Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Kesto: {route.duration} tuntia, kuljettu: {route.visitedIn}
            </Typography>
            <Typography component='legend'>
              Haastavuus
              <Rating name='difficulty' value={route.difficulty} readOnly style={{ color: theme.palette.primary.main }} />
            </Typography>
            <Typography component='legend'>
              Maisemat
              <Rating name='scenery' value={route.scenery} readOnly style={{ color: theme.palette.primary.main }} />
            </Typography>
            <Typography component='legend'>
              Fasiliteetit
              <Rating name='facilities' value={route.facilities} readOnly style={{ color: theme.palette.primary.main }} />
            </Typography>
            <Typography><i>{route.comment}</i></Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>

  )
}

