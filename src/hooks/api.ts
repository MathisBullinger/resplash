import { useState, useEffect } from 'react'
import * as api from 'api'

export function usePhotos() {
  const [photos, setPhotos] = useState<api.Photo[]>([])

  useEffect(() => {
    api.fetchImages().then(setPhotos)
  }, [])

  return photos
}
