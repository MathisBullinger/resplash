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
  color: string
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

type PhotoState = {
  byId: Record<string, Photo>
  favorites: string[]
  // photo ids in the order in that they appear in the editorial feed
  gallery: string[]
  page: number
}
const initialState: PhotoState = {
  byId: {},
  favorites: [],
  gallery: [],
  page: 0,
}

const { reducer, actions } = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Photo[]>) {
      for (const photo of action.payload)
        state.byId[photo.id] = merge(state.byId[photo.id], photo)

      state.gallery.push(
        ...action.payload
          .map(({ id }) => id)
          .filter(id => !state.gallery.includes(id))
      )
    },
    like({ favorites }, { payload: id }: PayloadAction<string>) {
      if (!favorites.includes(id)) favorites.push(id)
    },
    unlike(data, action: PayloadAction<string>) {
      data.favorites = data.favorites.filter(id => id !== action.payload)
    },
    hydrateFavorites(state, action: PayloadAction<Photo[]>) {
      const ids = action.payload.map(({ id }) => id)
      for (const photo of action.payload)
        state.byId[photo.id] = merge(state.byId[photo.id], photo)
      state.favorites.push(...ids.filter(id => !state.favorites.includes(id)))
    },
    nextPage(state) {
      state.page++
    },
  },
})

export const { add, like, unlike, nextPage } = actions
export default reducer

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
