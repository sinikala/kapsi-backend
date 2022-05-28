/* eslint-disable */
import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Stack, Typography } from '@mui/material'
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
              {parkNote.comments.length} kpl
            </Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <Comment comments={parkNote.comments} />
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
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>


    </Box>
  )
}

export default VisitedParkDetails





const Comment = ({ comments }) => {

  return (
    <Box>
      {comments.length === 0
        ? <Typography color='grey' variant='subtitle' component="div" >
          Ei muistiinpanoja
        </Typography>
        : comments.map(comment =>
          <Stack key={comment._id} sx={boxStyle} >
            <Typography color='gray' variant='body2' component="div" align='right'>
              <i>Luotu {new Date(comment.createdAt).toLocaleDateString('de-DE')}</i>
              <IconButton aria-label='edit' size='small' onClick={() => { }}>
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

