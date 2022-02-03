import React from 'react'
import type { Photo } from 'api'

const MasonPhoto: React.FC<Photo> = ({ id, urls }) => {
  return <img className="photo" src={urls.regular}></img>
}

export default MasonPhoto
