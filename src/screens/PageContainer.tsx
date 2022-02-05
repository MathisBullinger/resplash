import React, { CSSProperties } from 'react'
import { usePageIndex } from 'hooks/navigation'
import Home from 'screens/Home'
import Favorites from 'screens/Favorites'

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
