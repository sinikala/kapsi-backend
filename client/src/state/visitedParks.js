import { createSlice } from '@reduxjs/toolkit'

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
    setVisitedParksNull() {
      return []
    }
  }
})

export const { setVisitedParks, addVisitedPark, setVisitedParksNull } = visitedParksSlice.actions
export default visitedParksSlice.reducer