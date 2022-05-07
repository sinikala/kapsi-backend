import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'

const UserNote = () => {
  const park = useSelector(state => state.activePark)
  const parkNote = useSelector(state => state.notes.filter(note => note.park === park.id))[0]
  //console.log('parknote', parkNote)

  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  if (!parkNote) {
    return (
      <FormControl>
        <FormLabel id="new-note-radio-buttons">Sinulla ei vielä ole muistiinpanoja tästä puistosta.</FormLabel>
        <RadioGroup
          name="new-note-buttons"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="newNote" control={<Radio />} label="Merkitse puisto käydyksi ja luo muistiinpanoja" />
          <FormControlLabel value="plan" control={<Radio />} label="Suunnittele vierailuasi" />
        </RadioGroup>
      </FormControl>
    )
  }

  return (
    <div> Muistiinpanosi kohteesta {park.label}
      <Typography>Vierailtu {parkNote.visitedIn}</Typography>
    </div>

  )

}

export default UserNote