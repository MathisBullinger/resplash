import React from 'react'
import type { Exif, Photo } from 'state/photos'

const exifOrder = [
  ['make', 'Camera make'],
  ['model', 'Camera model'],
  ['focal', 'Focal length'],
  ['aperture', 'Aperture'],
  ['exposure', 'Shutter speed'],
  ['iso', 'ISO'],
]

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
export default PhotoExif

const ExifData: React.FC<{ exif: Partial<Exif> }> = ({ exif }) => (
  <dl className="exif__main">
    {exifOrder
      .filter(([key]) => key in exif)
      .map(([key, name]) => (
        <div key={key} className={['exif__datum', `exif__${key}`].join(' ')}>
          <dt className="exif__label">{name}</dt>
          <dd className="exif__value">{exif[key as keyof Exif]}</dd>
        </div>
      ))}
  </dl>
)
