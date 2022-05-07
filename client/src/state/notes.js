import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action) {
      return action.payload
    },
    setNotesNull() {
      return []
    }
  }
})

export const { setNotes, setNotesNull } = notesSlice.actions
export default notesSlice.reducer