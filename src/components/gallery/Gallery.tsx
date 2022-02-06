import React, { CSSProperties, useState } from 'react'
import type { Photo as APIPhoto } from 'state/photos'
import FixedGrid from './FixedGrid'
import MasonGrid from './MasonGrid'
import { useColumnCount } from 'hooks/layout'
import Loader from './Loader'
import { useAppState } from 'hooks/state'
import type { Layout as LayoutName } from 'state/preferences'

type Props = {
  photos: APIPhoto[]
  onScrollEnd?: () => void
  modalPath?: string
  layout?: LayoutName
}

export type LayoutProps = Omit<Props, 'onScrollEnd'> & { columns: number }
export type Layout = React.FC<LayoutProps>

const Gallery: React.FC<Props> = props => {
  const [container, setRef] = useState<HTMLElement | null>(null)
  const columns = useColumnCount(container)
  const prefLayout = useAppState(state => state.preferences.layout)
  const Layout = (props.layout ?? prefLayout) === 'grid' ? FixedGrid : MasonGrid

  return (
    <div
      ref={setRef}
      className="gallery"
      style={{ '--columns': columns } as CSSProperties}
    >
      {columns && <Layout {...props} columns={columns} />}
      {props.onScrollEnd && (
        <Loader count={props.photos.length} load={props.onScrollEnd} />
      )}
    </div>
  )
}

export default Gallery
