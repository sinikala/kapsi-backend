import { createSlice } from '@reduxjs/toolkit'
/*Redux Toolkit's createReducer and createSlice automatically use Immer internally
to let you write simpler immutable update logic using "mutating" syntax. */

const initialState = []

const visitedParksSlice = createSlice({
  name: 'visitedParks',
  initialState,
  reducers: {
    setVisitedParks(state, action) {
      return action.payload
    },
    addVisitedPark(state, action) {
      return state.concat(action.payload)
    },
    addVisitedParkComment(state, action) {
      const note = state.find((note) => note.id === action.payload.id)
      if (note) {
        note.comments = action.payload.comments
      }
    },
    setVisitedParksNull() {
      return []
    }
  }
})

export const { setVisitedParks, addVisitedPark, addVisitedParkComment, setVisitedParksNull } = visitedParksSlice.actions
export default visitedParksSlice.reducer