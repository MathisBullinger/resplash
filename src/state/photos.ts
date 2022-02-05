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

type PhotoState = { photos: Record<string, Photo>; favorites: string[] }
const initialState: PhotoState = { photos: {}, favorites: [] }

export const counterSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    add: ({ photos }, action: PayloadAction<Photo[]>) => {
      for (const photo of action.payload)
        photos[photo.id] = merge(photos[photo.id], photo)
    },
    like: ({ favorites }, { payload: id }: PayloadAction<string>) => {
      if (!favorites.includes(id)) favorites.push(id)
    },
    unlike: (data, action: PayloadAction<string>) => {
      data.favorites = data.favorites.filter(id => id !== action.payload)
    },
  },
})

export const { add, like, unlike } = counterSlice.actions
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
