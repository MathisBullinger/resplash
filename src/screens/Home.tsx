import React from 'react'
import Grid from 'components/masonry/Grid'
import { usePhotos } from 'hooks/state'

export default function Home() {
  const [photos, fetchMore] = usePhotos()
  return (
    <div>
      <Grid photos={photos} onScrollEnd={fetchMore} />
    </div>
  )
}
