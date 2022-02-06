import { useAppState, useDispatch } from 'hooks/state'
import React from 'react'
import { like, unlike } from 'state/photos'
import Button from './atoms/Button'

type Props = {
  id: string
  className?: string
  compact?: boolean
}

const LikeButton: React.FC<Props> = ({ id, compact, ...props }) => {
  const liked = useAppState(state => state.photos.favorites.includes(id))
  const dispatch = useDispatch()
  const toggleLike = () => dispatch(liked ? unlike(id) : like(id))

  return (
    <Button
      icon="heart"
      onClick={toggleLike}
      accent={liked}
      noText={compact}
      {...props}
      aria-pressed={liked}
    >
      {liked ? 'Unlike' : 'Like'}
    </Button>
  )
}

export default LikeButton
