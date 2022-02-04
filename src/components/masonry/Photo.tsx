import React from 'react'
import type { Photo } from 'api'
import { Link } from 'react-router-dom'

const MasonPhoto: React.FC<Photo> = ({ id, urls, width, height }) => {
  return (
    <Link to={`/photo/${id}`}>
      <img
        className="photo"
        src={urls.regular}
        loading="lazy"
        width={width}
        height={height}
      ></img>
    </Link>
  )
}

export default MasonPhoto
