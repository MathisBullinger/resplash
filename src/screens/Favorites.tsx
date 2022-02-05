import React from 'react'
import Grid from 'components/masonry/Grid'
import { useFavorites } from 'hooks/state'

const Favorites = () => {
  const photos = useFavorites()
  return photos.length > 0 ? (
    <Grid photos={photos} modalPath="/favorites" />
  ) : (
    <span className="no-favorites">
      You haven&apos;t favorited any photos yet.
    </span>
  )
}

export default Favorites
