import React from 'react'
import Button from './atoms/Button'

type Props = {
  id: string
}

const LikeButton: React.FC<Props> = ({ id }) => {
  return <Button icon="heart">Like</Button>
}

export default LikeButton
