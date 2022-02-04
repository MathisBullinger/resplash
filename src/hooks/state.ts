import { useCallback, useEffect, useRef, useState } from 'react'
import { add as addPhotos, Photo } from 'state/photos'
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

const sortByDate = (a: Photo, b: Photo) => b.date - a.date

export function usePhotos(sort = sortByDate) {
  const [page, setPage] = useState(0)
  const loading = useRef(false)
  const dispatch = useDispatch()
  const fetchMore = useCallback(() => setPage(page => page + 1), [])
  const photos = useAppState(state => state.photos)

  useEffect(() => {
    if (page < 1 || loading.current) return
    loading.current = true
    api.fetchPhotos(page).then(photos => {
      dispatch(addPhotos(photos))
      loading.current = false
    })
  }, [page, dispatch])

  return [Object.values(photos).sort(sort), fetchMore] as const
}

export function usePhoto(id: string) {
  const photo = useAppState(state => state.photos[id])
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
