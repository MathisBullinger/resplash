import React from 'react'
import type { Photo } from 'state/photos'
import { Link } from 'react-router-dom'
import LikeButton from 'components/LikeButton'

const MasonPhoto: React.FC<Photo> = ({ id, urls, width, height, title }) => {
  return (
    <figure className="photo">
      <Link to={`/photos/${id}`}>
        <img
          className="photo__img"
          src={urls.regular}
          loading="lazy"
          width={width}
          height={height}
          alt={title}
        ></img>
      </Link>
      <LikeButton id={id} className="photo__like" compact />
    </figure>
  )
}

export default MasonPhoto
