import React, { useEffect, useRef } from 'react'
import bem from 'utils/bem'

const Modal: React.FC<{ onClose?: () => void }> = ({ children, onClose }) => {
  useBlockScroll()
  useOnKey(onClose, 'Escape')

  return (
    <div
      className={bem('modal', { closable: onClose })}
      onClick={e => {
        if (e.target === e.currentTarget) onClose?.()
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

function useOnKey(cb?: (key: string) => void, ...keys: string[]) {
  const keyRef = useRef(keys)
  keyRef.current = keys

  useEffect(() => {
    const onKey = ({ key }: KeyboardEvent) => {
      if (keyRef.current.some(v => v === key)) cb?.(key)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cb])
}
