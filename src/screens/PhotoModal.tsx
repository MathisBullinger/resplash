import React from 'react'
import Modal from 'components/atoms/Modal'
import { useParams, useLocation } from 'react-router-dom'
import { usePhoto } from 'hooks/state'
import type { Photo, User } from 'state/photos'
import bem from 'utils/bem'

export default function ModalRoute() {
  const { id } = useParams<{ id: string }>()
  const photo = usePhoto(id!)
  if (!photo) return null
  return <PhotoModal photo={photo} />
}

const PhotoModal: React.FC<{ photo: Photo }> = ({ photo }) => {
  const baseUrl = useLocation().pathname.replace(/(photos\/?)[^/]+\/?$/, '')

  return (
    <Modal closeUrl={baseUrl}>
      <article className="photo-modal">
        <div className="photo-modal__img-sec">
          <ModalPhoto photo={photo} />
        </div>
        <div className="photo-modal__txt-sec">
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

const PhotoExif: React.FC<{ photo: Photo }> = ({ photo }) => {
  if (!photo.exif && photo.source === 'batch') return null
  return (
    <div className="photo-modal__exif">
      {!photo.exif ? (
        <span className="photo-modal__no-exif">No Exif data available.</span>
      ) : (
        <dl className="photo-modal__exif-main">
          {Object.entries(photo.exif).map(([k, v]) => (
            <div key={k} className="photo-modal__exif-datum">
              <dt className="photo-modal__exif-label">{k}</dt>
              <dd className="photo-modal__exif-value">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
