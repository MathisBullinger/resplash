import React, { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import Button from './atoms/Button'
import type { Icon } from './atoms/Icon'

export default function Mainnav() {
  const location = useLocation()
  const isHome = !/\/favorites(\/|$)/.test(location.pathname)

  return (
    <nav className="mainnav">
      <Button icon="logo" linkTo="/" noText className="mainnav__logo">
        <h1>Reshape</h1>
      </Button>
      <ul
        className="mainnav__pages"
        style={{ '--current': isHome ? 0 : 1 } as CSSProperties}
      >
        <Page path="/" icon="img" label="home" active={isHome} />
        <Page path="/favorites" icon="heart" active={!isHome} />
      </ul>
    </nav>
  )
}

type PageProps = {
  icon: Icon
  path: string
  label?: string
  active?: boolean
}

const Page: React.FC<PageProps> = ({ icon, path, label, active }) => (
  <li className="mainnav__page">
    <Button
      linkTo={path}
      icon={icon}
      noText
      className="mainnav__button"
      aria-current={active ? 'page' : undefined}
    >
      {label ?? path.replace(/^\//, '')}
    </Button>
  </li>
)
