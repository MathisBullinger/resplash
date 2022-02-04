import React from 'react'
import Modal from 'components/atoms/Modal'
import { useParams } from 'react-router-dom'

export default function PhotoModal() {
  const { id } = useParams<{ id: string }>()
  console.log({ id })

  return (
    <Modal>
      <div className="photo-modal"></div>
    </Modal>
  )
}
