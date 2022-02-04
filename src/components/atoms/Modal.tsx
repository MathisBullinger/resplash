import React, { useEffect } from 'react'

export default function Modal() {
  useBlockScroll()
  return (
    <div className="modal">
      <aside role="dialog" className="modal__inner"></aside>
    </div>
  )
}

function useBlockScroll() {
  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => void document.body.classList.toggle('noscroll', false)
  }, [])
}
