import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const plannedParksSlice = createSlice({
  name: 'plannedParks',
  initialState,
  reducers: {
    setPlannedParks(state, action) {
      return action.payload
    },
    addPlannedPark(state, action) {
      return state.concat(action.payload)
    },
    setPlannedParksNull() {
      return []
    }
  }
})

export const { setPlannedParks, addPlannedPark, setPlannedParksNull } = plannedParksSlice.actions
export default plannedParksSlice.reducer