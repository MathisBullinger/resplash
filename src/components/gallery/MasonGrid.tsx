import React, { useState } from 'react'
import Photo from './Photo'
import { useColumns } from 'hooks/layout'
import type { LayoutProps as Props } from './Gallery'

/* This is the default masonry-style layout used in the photo gallery.
   The photos are pushed - in the order in that they are served by the API -
   on whichever column is the smallest.
   So every column will be about the same height (difference within the height
   of one photo) and the photos will be sorted top-top-bottom in the order in 
   that they were handed to the client, but the photos won't form an actual grid
   in the strict sense of the term. 
   When adding or removing columns by resizing, the photos will be redistributed
   to evenly cover all columns, but no particular order will be guaranteed. */

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
