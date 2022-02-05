import React from 'react'
import Button from './atoms/Button'
import type { Icon } from './atoms/Icon'

export default function Mainnav() {
  return (
    <nav className="mainnav">
      <Button icon="logo" linkTo="/" noText className="mainnav__logo">
        <h1>Reshape</h1>
      </Button>
      <ul className="mainnav__pages">
        <Page path="/" icon="img" label="home" />
        <Page path="/favorites" icon="heart" />
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

const Page: React.FC<PageProps> = ({ icon, path, label }) => (
  <li className="mainnav__page">
    <Button linkTo={path} icon={icon} noText className="mainnav__button">
      {label ?? path.replace(/^\//, '')}
    </Button>
  </li>
)
