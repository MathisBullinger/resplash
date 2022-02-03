import React from 'react'
import type { Photo } from 'api'

const MasonPhoto: React.FC<Photo> = ({ id, urls, width, height }) => {
  return (
    <img
      className="photo"
      src={urls.regular}
      loading="lazy"
      width={width}
      height={height}
    ></img>
  )
}

export default MasonPhoto
