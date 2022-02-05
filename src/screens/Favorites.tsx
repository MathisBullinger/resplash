import React from 'react'
import Grid from 'components/masonry/Grid'
import { useFavorites } from 'hooks/state'

const Favorites = () => (
  <div>
    <Grid photos={useFavorites()} />
  </div>
)

export default Favorites
