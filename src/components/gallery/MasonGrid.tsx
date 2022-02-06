import React, { useState } from 'react'
import Photo from './Photo'

import { useColumns } from 'hooks/layout'
import type { LayoutProps as Props } from './Gallery'

const Grid: React.FC<Props> = props => {
  const columns = useColumns(props.columns, props.photos)

  return (
    <div className="masonry">
      {columns.map((imgs, i) => (
        <Column key={i} photos={imgs} modalPath={props.modalPath} />
      ))}
    </div>
  )
}
export default Grid

const Column: React.FC<Omit<Props, 'columns'>> = props => {
  const [eager, setEager] = useState(0)
  return (
    <div className="masonry__column">
      {props.photos.map((photo, i) => (
        <Photo
          key={photo.id}
          photo={photo}
          modalPath={props.modalPath}
          eager={i <= eager}
          onLoad={() => setEager(n => Math.max(n, i + 1))}
        />
      ))}
    </div>
  )
}
