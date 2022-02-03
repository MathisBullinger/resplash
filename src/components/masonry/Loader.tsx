import React, { useRef, useEffect, useState, MutableRefObject } from 'react'

/*
  This component is used to generically implement infinite scrolling of the 
  masonry grid.
  My idea behind this is the following: instead of attaching scroll listeners
  directly to the infinite scroller, just place an element at the very end of
  the scroller and whenever that element is visible, it can be assumed that more
  content needs to be loaded.
  To achieve this, an intersection observer is connected to this component. 
  Whenever the observer detects an intersection with the viewport, a 
  callback (load) is called to request more content. The observer is 
  disconnected and only continues observing once new content becomes available
  (i.e. count - representing the number of photos in the grid - increases).
*/

const Loader: React.FC<{ count: number; load: () => void }> = ({
  count,
  load,
}) => {
  const ref = useRef(null)
  useLoad(ref, count, load)
  return <div className="masonry__load" ref={ref} />
}
export default Loader

function useLoad(
  el: MutableRefObject<HTMLElement | null>,
  count: number,
  cb: () => void
) {
  const [observer] = useState(
    new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting) return
      observer.disconnect()
      observing.current = false
      cb()
    })
  )
  const observing = useRef(false)

  useEffect(() => {
    if (observing.current || !el.current) return
    observer.observe(el.current)
    observing.current = true
  }, [count, observer, el])
}
