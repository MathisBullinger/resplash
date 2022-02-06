import { useCallback, useEffect, useRef } from 'react'
import { add as addPhotos, nextPage } from 'state/photos'
import type store from 'state/store'
import * as redux from 'react-redux'
import * as api from 'api'

export const useDispatch = () => redux.useDispatch<typeof store.dispatch>()

export const useAppState: redux.TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = redux.useSelector

/*
  In a proper redux application it would almost certainly be a better idea to 
  handle all async data fetching logic centrally in the redux middleware layer.
  For simplicity's sake here I'll handle that logic directly in the hooks that
  are used to retrieve the different types of data. In this demo there really
  are only two hooks that potentially need fetch data through the API anyway: 
  usePhotos and usePhoto.
*/

export function usePhotos() {
  const page = useAppState(state => state.photos.page)
  const loading = useRef(false)
  const dispatch = useDispatch()
  const photos = useAppState(({ photos }) =>
    photos.gallery.map(id => photos.byId[id])
  )
  const initialized = useRef(false)
  const fetchMore = useCallback(() => {
    if (initialized.current) dispatch(nextPage())
  }, [dispatch])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }
    if (page < 1 || loading.current) return
    loading.current = true
    api.fetchPhotos(page).then(photos => {
      dispatch(addPhotos(photos))
      loading.current = false
    })
  }, [page, dispatch])

  return [photos, fetchMore] as const
}

export const useFavorites = () =>
  Object.values(
    useAppState(({ photos }) => photos.favorites.map(id => photos.byId[id]))
  )

export function usePhoto(id: string) {
  const photo = useAppState(state => state.photos.byId[id])
  const dispatch = useDispatch()
  const fetched = useRef(false)

  useEffect(() => {
    if (photo?.exif || fetched.current) return
    api.fetchPhoto(id).then(result => {
      fetched.current = true
      dispatch(addPhotos([result]))
    })
  }, [photo, id, dispatch])

  return photo
}
