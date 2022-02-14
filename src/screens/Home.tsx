import React from 'react'
import Gallery from 'components/gallery/Gallery'
import { usePhotos } from 'hooks/state'

export default function Home() {
  const [photos, fetchMore] = usePhotos()
  return <Gallery photos={photos} onScrollEnd={fetchMore} />
}
