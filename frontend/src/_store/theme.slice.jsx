import { createSlice } from '@reduxjs/toolkit'

// Create actions and reducer in a same place: a Slice
const themeSlice = createSlice({
  // The name of the slice
  name: 'theme',
  // The initial state
  initialState: 'dark',
  // Reducers makes it possible to define the actions and the reducer
  reducers: {
    // the "toggle" action ('theme/toggle')
    toggle: (state) => {
      return state === 'light' ? 'dark' : 'light'
    },
    // the "set" action ('theme/set')
    set: (_state, action) => {
      return action.payload
    },
  },
})

// we extract the actions and the reducer
const { actions, reducer } = themeSlice
// We export each action individually
export const { set, toggle } = actions
// we export the reducer as default export
export default reducer
