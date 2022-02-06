import React, { useState, useEffect } from 'react'
import type { Photo as APIPhoto } from 'state/photos'
import type { Layout } from './Gallery'
import { take, repeat, partition, sequence } from 'utils/list'
import Photo from './Photo'
import bem from 'utils/bem'

/* This is the photo gallery-layout *exactly* as it is visible in Figma:
   alternating portrait- and landscape-photographs, each of the exact same
   aspect-ratio and forming the lines of a perfect grid (each portrait-format
   photo takes up two rows).
   
   This does mean however, that the photos are cropped to fit the same 
   aspect-ratio and that some photos won't be displayed because for this layout
   to work there must be the same number of portrait- and landscape-photographs. 
   
   For this reason, this layout is not available on the favorites page.
   The reason why I've included this layout at all is so that I adhere to the
   shared requirements as closely as possible and also can demonstrate the usage
   of an actual grid-based layout in this app. */

const Grid: Layout = ({ photos, columns }) => {
  const list = useStackSequenced(columns, photos)

  return (
    <ul className="fixgrid">
      {list.map(photo => (
        <li
          key={photo.id}
          className={bem(
            'fixgrid__img',
            photo.width < photo.height ? 'portrait' : 'landscape'
          )}
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
