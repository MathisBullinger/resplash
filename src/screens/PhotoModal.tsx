import React from 'react'
import Modal from 'components/atoms/Modal'
import { useParams, useHistory } from 'react-router-dom'
import { usePhoto } from 'hooks/state'
import type { Exif, Photo, User } from 'state/photos'
import bem from 'utils/bem'
import Button from 'components/atoms/Button'
import LikeButton from 'components/LikeButton'

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

  return (
    <Modal onClose={close}>
      <article className="photo-modal">
        <div className="photo-modal__img-sec">
          <ModalPhoto photo={photo} />
        </div>
        <div className="photo-modal__txt-sec">
          <Actions id={photo.id} onClose={close} />
          <header>
            <h1 className="photo-modal__title">{photo.title}</h1>
            <Author user={photo.author} />
          </header>
          <PhotoExif photo={photo} />
        </div>
      </article>
    </Modal>
  )
}

const ModalPhoto: React.FC<{ photo: Photo }> = ({ photo }) => (
  <img
    className={bem('photo-modal__photo', {
      vert: 2 * photo.height > 1.56 * photo.width,
    })}
    width={photo.width}
    height={photo.height}
    src={photo.urls.full}
    alt={photo.title}
  ></img>
)

const Author: React.FC<{ user: User }> = ({ user }) => {
  return (
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
}

const exifOrder = new Map([
  ['make', 'Camera make'],
  ['model', 'Camera model'],
  ['focal', 'Focal length'],
  ['aperture', 'Aperture'],
  ['exposure', 'Shutter speed'],
  ['iso', 'ISO'],
])

const PhotoExif: React.FC<{ photo: Photo }> = ({ photo }) => {
  if (!photo.exif && photo.source === 'batch') return null
  return (
    <div className="exif">
      {!photo.exif ? (
        <span className="photo-modal__no-exif">No Exif data available.</span>
      ) : (
        <ExifData exif={photo.exif} />
      )}
    </div>
  )
}

const ExifData: React.FC<{ exif: Partial<Exif> }> = ({ exif }) => (
  <dl className="exif__main">
    {Object.entries(exif).map(([k, v]) => (
      <div key={k} className={['exif__datum', `exif__${k}`].join(' ')}>
        <dt className="exif__label">{exifOrder.get(k)}</dt>
        <dd className="exif__value">{v}</dd>
      </div>
    ))}
  </dl>
)

const Actions: React.FC<{ id: string; onClose: () => void }> = props => {
  return (
    <div className="photo-modal__actions">
      <LikeButton id={props.id} />
      <Button icon="close" noText onClick={props.onClose}>
        close
      </Button>
    </div>
  )
}
