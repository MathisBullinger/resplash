import React, { useState, useEffect } from 'react'
import type { Photo as APIPhoto } from 'state/photos'
import type { Layout } from './Gallery'
import { take, repeat, partition, sequence } from 'utils/list'
import Photo from './Photo'
import bem from 'utils/bem'

const Grid: Layout = ({ photos, columns }) => {
  const list = useStackSequenced(columns, photos)

  return (
    <ul className="fixgrid">
      {list.map(photo => (
        <li
          key={photo.id}
          className={bem('fixgrid__img', {
            portrait: photo.width < photo.height,
            landscape: photo.width >= photo.height,
          })}
        >
          <Photo photo={photo} cover />
        </li>
      ))}
    </ul>
  )
}
export default Grid

function useStackSequenced(columns: number, photos: APIPhoto[]) {
  const [sequenced, setSequenced] = useState<APIPhoto[]>([])

  useEffect(() => {
    setSequenced(
      sequence(
        partition(photos, ({ width, height }) => height > width),
        stackSequence(columns)
      )
    )
  }, [photos, columns])

  return sequenced
}

const stackSequence = (n: number) => [
  ...take(n, repeat(0, 1)),
  ...take(Math.floor(n / 2), repeat(0)),
  ...take(Math.ceil(n / 2), repeat(1)),
]
