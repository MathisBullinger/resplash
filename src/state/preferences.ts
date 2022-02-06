import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Layout = 'grid' | 'mason'
export type Theme = 'light' | 'dark'

type State = {
  layout: Layout
  theme: Theme
}
const initialState: State = {
  layout: (localStorage.getItem('layout') as Layout) ?? 'mason',
  theme: (localStorage.getItem('theme') as Theme) ?? 'dark',
}

const { reducer, actions } = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<Layout>) {
      state.layout = action.payload
      localStorage.setItem('layout', action.payload)
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
      document.documentElement.dataset.theme = action.payload
    },
  },
})

export const { setLayout, setTheme } = actions
export default reducer
