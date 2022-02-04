import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Photo = {
  id: string
  title: string
  date: number
  author: User
  width: number
  height: number
  exif?: Partial<Exif>
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  source: 'batch' | 'detailed'
}

export type User = {
  handle: string
  name: string
  image: string
}

export type Exif = {
  aperture: string
  exposure: string
  focal: string
  iso: number
  make: string
  model: string
}

type PhotoState = Record<string, Photo>
const initialState: PhotoState = {}

export const counterSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Photo[]>) => {
      for (const photo of action.payload)
        state[photo.id] = merge(state[photo.id], photo)
    },
  },
})

export const { add } = counterSlice.actions
export default counterSlice.reducer

// recursively merge b into a
const merge = <T>(a: T | undefined, b: T): T => {
  if (typeof b !== 'object' || b === null) return b || a!
  if (typeof a !== 'object' || a === null) return b
  return Object.fromEntries(
    [...new Set([...Object.keys(a), ...Object.keys(b)])].map(key => [
      key,
      merge((a as any)[key], (b as any)[key]),
    ])
  ) as T
}
