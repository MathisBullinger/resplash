import React, { useCallback, useState } from 'react'
import Grid from 'components/masonry/Grid'
import { useFetchPhotos } from 'hooks/api'
import { useAppState } from 'hooks/state'

export default function Home() {
  const photos = useAppState(state => state.photos)
  const [page, setPage] = useState(0)
  const loadMore = useCallback(() => setPage(page => page + 1), [])
  useFetchPhotos(page)

  return (
    <div>
      <Grid photos={Object.values(photos)} onScrollEnd={loadMore} />
    </div>
  )
}
