import Grid from 'components/masonry/Grid'
import { usePhotos } from 'hooks/api'
import React from 'react'

export default function Home() {
  const photos = usePhotos()
  return (
    <div>
      <Grid photos={photos} />{' '}
    </div>
  )
}
