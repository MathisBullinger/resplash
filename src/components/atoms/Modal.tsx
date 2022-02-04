import React, { useEffect } from 'react'

const Modal: React.FC = ({ children }) => {
  useBlockScroll()
  return (
    <div className="modal">
      <aside role="dialog" className="modal__inner">
        {children}
      </aside>
    </div>
  )
}

export default Modal

function useBlockScroll() {
  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => void document.body.classList.toggle('noscroll', false)
  }, [])
}
