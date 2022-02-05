import React from 'react'
import Grid from 'components/masonry/Grid'
import { useFavorites } from 'hooks/state'

const Favorites = () => (
  <div>
    <Grid photos={useFavorites()} modalPath="/favorites" />
  </div>
)

export default Favorites
