import React, { CSSProperties } from 'react'
import { usePageIndex } from 'hooks/navigation'
import Home from 'screens/Home'
import Favorites from 'screens/Favorites'

/* To enable the sliding transition between the home and favorites screens,
   both screens are rendered inside this component and based on the current 
   route the content is translated into view.
   As an optimization, both screens technically only need to be rendered while 
   the transition in in progress, but for this small example always rendering
   both screens should be fine. */

export default function PageContainer() {
  const page = usePageIndex()

  return (
    <div className="page-container" style={{ '--page': page } as CSSProperties}>
      <div className="page-container__inner">
        <div className="page-container__slot" aria-hidden={page !== 0}>
          <Home />
        </div>
        <div className="page-container__slot" aria-hidden={page !== 1}>
          <Favorites />
        </div>
      </div>
    </div>
  )
}
