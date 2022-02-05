import React from 'react'
import type { Photo } from 'state/photos'
import { Link } from 'react-router-dom'
import LikeButton from 'components/LikeButton'

type Props = {
  photo: Photo
  modalPath?: string
}

const MasonPhoto: React.FC<Props> = ({ photo, modalPath = `/photos` }) => (
  <figure className="photo">
    <Link to={`${modalPath}/${photo.id}`}>
      <img
        className="photo__img"
        src={photo.urls.regular}
        loading="lazy"
        width={photo.width}
        height={photo.height}
        alt={photo.title}
      ></img>
    </Link>
    <LikeButton id={photo.id} className="photo__like" compact />
  </figure>
)

export default MasonPhoto
