import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, IconButton, Rating, Stack, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import theme from '../../theme/theme'
import AddCommentModal from './AddCommentModal'


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
          id="panel1bh-header">
          <Typography color='primary'
            sx={{ width: '33%', flexShrink: 0, fontWeight: 'medium' }}>
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
          id="panel2bh-header">
          <Typography color='primary'
            sx={{ width: '33%', flexShrink: 0, fontWeight: 'medium' }}>
            Muistiinpanot
          </Typography>
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
          <Comments comments={parkNote.comments} parkNoteId={parkNote.id} />
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header">
          <Typography color='primary'
            sx={{ width: '33%', flexShrink: 0, fontWeight: 'medium' }}>
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
          <Box sx={containerStyle}>
            {parkNote.routes.map(route =>
              <Route route={route} key={route.id} />
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}


const Comments = ({ comments, parkNoteId }) => {
  const [open, setOpen] = useState(false)
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton aria-label='add' color='primary' key="addComment" onClick={() => { setOpen(true) }}>
          <AddBoxIcon />
        </IconButton>
        <AddCommentModal parkNoteId={parkNoteId} open={open} setOpen={setOpen} />
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


const Route = ({ route }) => {
  const handleEdit = () => {
    console.log(route)
  }

  return (
    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header">
        <Typography color='primary' sx={{ width: '33%', flexShrink: 0, fontWeight: 'medium' }}>
          {route.name}
        </Typography>
        <Typography >
          {route['length']} km
        </Typography>

      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography gutterBottom={true}>
              Kuljettu:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom={true}>
              {route.visitedIn}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label='editRoute' size='small' color='primary' key={route.id} onClick={handleEdit}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography gutterBottom={true}>
              Kesto:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom={true}>
              {route.duration} tuntia
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography component='legend' >
              Haastavuus
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Rating
              name='difficulty'
              value={route.difficulty}
              readOnly
              precision={0.5}
              style={{ color: theme.palette.primary.main }} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography component='legend' >
              Maisemat
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Rating
              name='scenery'
              value={route.scenery}
              readOnly
              precision={0.5}
              style={{ color: theme.palette.primary.main }} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography component='legend' >
              Fasiliteetit
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Rating
              name='facilities'
              value={route.facilities}
              readOnly
              precision={0.5}
              style={{ color: theme.palette.primary.main }} />
          </Grid>
        </Grid>

        <Divider variant='middle' sx={{ margin: 1 }} />
        <Typography><i>{route.comment}</i></Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default VisitedParkDetails