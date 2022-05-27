import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const plannedParksSlice = createSlice({
  name: 'plannedParks',
  initialState,
  reducers: {
    setPlannedParks(state, action) {
      return action.payload
    },
    setPlannedParksNull() {
      return []
    }
  }
})

export const { setPlannedParks, setPlannedParksNull } = plannedParksSlice.actions
export default plannedParksSlice.reducer