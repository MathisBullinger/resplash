import React, { useCallback } from 'react'
import type { Photo as APIPhoto } from 'state/photos'
import Photo from './Photo'
import Loader from './Loader'
import { clamp } from 'utils/math'
import { useColumnCount, useColumns } from 'hooks/layout'

type Props = {
  photos: APIPhoto[]
  onScrollEnd?: () => void
  modalPath?: string
}

const Grid: React.FC<Props> = ({ photos, onScrollEnd, modalPath }) => {
  const numColumns = useCallback(
    (width: number) => Math.floor(clamp(2, width / 250, Infinity)),
    []
  )
  const clCount = useColumnCount(numColumns)
  const columns = useColumns(clCount, photos)

  return (
    <div className="masonry">
      {onScrollEnd && <Loader count={photos.length} load={onScrollEnd} />}
      {columns.map((imgs, i) => (
        <Column key={i} photos={imgs} modalPath={modalPath} />
      ))}
    </div>
  )
}
export default Grid

const Column: React.FC<Omit<Props, 'onScrollEnd'>> = props => {
  return (
    <div className="masonry__column">
      {props.photos.map(photo => (
        <Photo key={photo.id} photo={photo} modalPath={props.modalPath} />
      ))}
    </div>
  )
}
