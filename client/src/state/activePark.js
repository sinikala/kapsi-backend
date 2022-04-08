import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const activeParkSlice = createSlice({
  name: 'activePark',
  initialState,
  reducers: {
    setActivePark(state, action) {
      return action.payload
    },
    setParkNull(state, action) {
      return null
    }
  }
})

export const { setActivePark, setParkNull } = activeParkSlice.actions
export default activeParkSlice.reducer