import { useState, useEffect } from 'react'
import * as api from 'api'

export function usePhotos(page = 1) {
  const [photos, setPhotos] = useState<api.Photo[]>([])

  useEffect(() => {
    if (page < 1) return
    api.fetchImages(page).then(photos => {
      setPhotos(known => [
        ...known,
        ...photos.filter(({ id }) => !known.find(v => v.id === id)),
      ])
    })
  }, [page])

  return photos
}
