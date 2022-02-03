import React, { useCallback, useState } from 'react'
import Grid from 'components/masonry/Grid'
import { usePhotos } from 'hooks/api'

export default function Home() {
  const [page, setPage] = useState(0)
  const photos = usePhotos(page)
  const loadMore = useCallback(() => setPage(page => page + 1), [])

  return (
    <div>
      <Grid photos={photos} onScrollEnd={loadMore} />
    </div>
  )
}
