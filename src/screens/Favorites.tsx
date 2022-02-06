import React from 'react'
import Gallery from 'components/gallery/Gallery'
import { useFavorites } from 'hooks/state'

const Favorites = () => {
  const photos = useFavorites()
  return photos.length > 0 ? (
    <Gallery photos={photos} modalPath="/favorites" />
  ) : (
    <span className="no-favorites">
      You haven&apos;t favorited any photos yet.
    </span>
  )
}

export default Favorites
