import React, { CSSProperties } from 'react'
import type { Photo } from 'state/photos'
import { Link } from 'react-router-dom'
import LikeButton from 'components/LikeButton'
import bem from 'utils/bem'

type Props = {
  photo: Photo
  modalPath?: string
  eager?: boolean
  onLoad?: () => void
  cover?: boolean
}

const MasonPhoto: React.FC<Props> = ({
  photo,
  modalPath = `/photos`,
  eager = false,
  onLoad,
  cover,
}) => (
  <figure
    className={bem('photo', { cover })}
    style={{ '--color': photo.color } as CSSProperties}
  >
    <Link to={`${modalPath}/${photo.id}`}>
      <img
        className={bem('photo__img', { cover })}
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
