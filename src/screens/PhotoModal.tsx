import React, { CSSProperties } from 'react'
import Modal from 'components/atoms/Modal'
import { useParams, useHistory } from 'react-router-dom'
import { usePhoto } from 'hooks/state'
import type { Photo, User } from 'state/photos'
import bem from 'utils/bem'
import Button from 'components/atoms/Button'
import LikeButton from 'components/LikeButton'
import Exif from 'components/Exif'

export default function ModalRoute() {
  const { id } = useParams<{ id: string }>()
  const photo = usePhoto(id!)
  if (!photo) return null
  return <PhotoModal photo={photo} />
}

const PhotoModal: React.FC<{ photo: Photo }> = ({ photo }) => {
  const history = useHistory()
  const closeUrl = history.location.pathname.replace(/(photos\/)?[^/]+\/?$/, '')
  const close = () => {
    if (closeUrl) history.push(closeUrl)
  }
  const anchorVert = 2 * photo.height > 1.56 * photo.width

  return (
    <Modal onClose={close}>
      <article className="photo-modal">
        <div className={bem('photo-modal__img-sec', { hor: !anchorVert })}>
          <ModalPhoto photo={photo} anchorVert={anchorVert} />
        </div>
        <div className="photo-modal__txt-sec">
          <Actions id={photo.id} onClose={close} />
          <header>
            <h1 className="photo-modal__title">{photo.title}</h1>
            <Author user={photo.author} />
          </header>
          <Exif photo={photo} />
        </div>
      </article>
    </Modal>
  )
}

const ModalPhoto: React.FC<{ photo: Photo; anchorVert: boolean }> = ({
  photo,
  anchorVert,
}) => (
  <img
    className={bem('photo-modal__photo', { vert: anchorVert })}
    width={photo.width}
    height={photo.height}
    src={photo.urls.full}
    alt={photo.title}
    style={{ '--color': photo.color } as CSSProperties}
  ></img>
)

const Author: React.FC<{ user: User }> = ({ user }) => (
  <address className="user">
    <img
      className="user__avatar"
      src={user.image}
      width={1}
      height={1}
      alt=""
    />
    <a
      className="user__name"
      rel="author"
      href={`https://unsplash.com/@${user.handle}`}
    >
      {user.name}
    </a>
  </address>
)

const Actions: React.FC<{ id: string; onClose: () => void }> = props => (
  <div className="photo-modal__actions">
    <LikeButton id={props.id} />
    <Button icon="close" noText onClick={props.onClose}>
      close
    </Button>
  </div>
)
