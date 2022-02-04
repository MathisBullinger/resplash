import React, { useCallback } from 'react'
import type { Photo as APIPhoto } from 'state/photos'
import Photo from './Photo'
import Loader from './Loader'
import { clamp } from 'utils/math'
import { useColumnCount, useColumns } from 'hooks/layout'

const Grid: React.FC<{ photos: APIPhoto[]; onScrollEnd: () => void }> = ({
  photos,
  onScrollEnd,
}) => {
  const numColumns = useCallback(
    (width: number) => Math.floor(clamp(1, width / 250, Infinity)),
    []
  )
  const clCount = useColumnCount(numColumns)
  const columns = useColumns(clCount, photos)

  return (
    <div className="masonry">
      <Loader count={photos.length} load={onScrollEnd} />
      {columns.map((imgs, i) => (
        <Column key={i} photos={imgs} />
      ))}
    </div>
  )
}
export default Grid

const Column: React.FC<{ photos: APIPhoto[] }> = ({ photos }) => {
  return (
    <div className="masonry__column">
      {photos.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  )
}
