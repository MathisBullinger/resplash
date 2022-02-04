import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import bem from 'utils/bem'

const Modal: React.FC<{ closeUrl?: string }> = ({ children, closeUrl }) => {
  const navigate = useNavigate()
  const close = useCallback(() => {
    if (closeUrl) navigate(closeUrl)
  }, [closeUrl, navigate])

  useBlockScroll()
  useOnKey(close, 'Escape')

  return (
    <div
      className={bem('modal', { closable: closeUrl })}
      onClick={e => {
        if (e.target === e.currentTarget) close()
      }}
    >
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

function useOnKey(cb: (key: string) => void, ...keys: string[]) {
  const keyRef = useRef(keys)
  keyRef.current = keys

  useEffect(() => {
    const onKey = ({ key }: KeyboardEvent) => {
      if (keyRef.current.some(v => v === key)) cb(key)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cb])
}
