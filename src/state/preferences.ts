import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Layout = 'grid' | 'mason'
type State = {
  layout: Layout
}
const initialState: State = {
  layout: (localStorage.getItem('layout') as Layout) ?? 'mason',
}

const { reducer, actions } = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<Layout>) {
      state.layout = action.payload
      localStorage.setItem('layout', action.payload)
    },
  },
})

export const { setLayout } = actions
export default reducer
