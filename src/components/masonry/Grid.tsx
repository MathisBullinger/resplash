import React, { useEffect, useState } from 'react'
import * as api from 'api'
import Photo from './Photo'

export default function Grid() {
  const photos = usePhotos()
  const columns = useColumns(4, photos)

  return (
    <div className="masonry">
      {columns.map((imgs, i) => (
        <Column key={i} photos={imgs} />
      ))}
    </div>
  )
}

const Column: React.FC<{ photos: api.Photo[] }> = ({ photos }) => {
  return (
    <div className="masonry__column">
      {photos.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  )
}

function usePhotos() {
  const [photos, setPhotos] = useState<api.Photo[]>([])

  useEffect(() => {
    api.fetchImages().then(setPhotos)
  }, [])

  return photos
}

function useColumns(numColumns: number, photos: api.Photo[]) {
  const [columns, setColumns] = useState<api.Photo[][]>([])

  useEffect(() => {
    setColumns(columns => {
      const newColumns = columns.map(col =>
        col.filter(img => photos.includes(img))
      )

      while (newColumns.length > numColumns) newColumns.pop()
      while (newColumns.length < numColumns) newColumns.push([])

      const columnHeights = newColumns.map(col =>
        col.reduce((a, c) => a + c.height / c.width, 0)
      )

      for (const photo of photos) {
        const smallest = columnHeights.indexOf(Math.min(...columnHeights))
        columnHeights[smallest] += photo.height / photo.width
        newColumns[smallest].push(photo)
      }

      return newColumns
    })
  }, [numColumns, photos])

  return columns
}
