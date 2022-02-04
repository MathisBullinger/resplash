import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Photo = {
  id: string
  width: number
  height: number
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}

type PhotoState = Record<string, Photo>
const initialState: PhotoState = {}

export const counterSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Photo[]>) => {
      for (const photo of action.payload) state[photo.id] = photo
    },
  },
})

export const { add } = counterSlice.actions
export default counterSlice.reducer
