import { useEffect } from 'react'
import { fetchImages } from 'api'
import { add } from 'state/photos'
import { useDispatch } from './state'

export function useFetchPhotos(page = 1) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (page < 1) return
    fetchImages(page).then(photos => {
      dispatch(add(photos))
    })
  }, [page, dispatch])
}
