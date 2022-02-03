import React from 'react'
import Grid from 'components/masonry/Grid'
import { usePhotos } from 'hooks/api'

const App: React.FC = () => {
  const photos = usePhotos()

  return <Grid photos={photos} />
}

export default App
