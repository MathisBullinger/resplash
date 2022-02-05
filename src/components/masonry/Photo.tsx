import React, { CSSProperties } from 'react'
import type { Photo } from 'state/photos'
import { Link } from 'react-router-dom'
import LikeButton from 'components/LikeButton'

type Props = {
  photo: Photo
  modalPath?: string
  eager?: boolean
  onLoad?: () => void
}

const MasonPhoto: React.FC<Props> = ({
  photo,
  modalPath = `/photos`,
  eager = false,
  onLoad,
}) => (
  <figure className="photo" style={{ '--color': photo.color } as CSSProperties}>
    <Link to={`${modalPath}/${photo.id}`}>
      <img
        className="photo__img"
        src={photo.urls.regular}
        loading={eager ? 'eager' : 'lazy'}
        width={photo.width}
        height={photo.height}
        alt={photo.title}
        onLoad={onLoad}
      ></img>
    </Link>
    <LikeButton id={photo.id} className="photo__like" compact />
  </figure>
)

export default MasonPhoto
