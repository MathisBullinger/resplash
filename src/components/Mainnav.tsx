import React, { CSSProperties } from 'react'
import { setLayout, setTheme } from 'state/preferences'
import { usePageIndex } from 'hooks/navigation'
import { useAppState, useDispatch } from 'hooks/state'
import Button from './atoms/Button'
import type { Icon } from './atoms/Icon'

export default function Mainnav() {
  const page = usePageIndex()

  return (
    <nav className="mainnav">
      <Button icon="logo" linkTo="/" noText className="mainnav__logo">
        <h1>Reshape</h1>
      </Button>
      <ul
        className="mainnav__pages"
        style={{ '--current': page } as CSSProperties}
      >
        <Page path="/" icon="img" label="home" active={page === 0} />
        <Page path="/favorites" icon="heart" active={page === 1} />
      </ul>
      <div className="mainnav__prefs">
        {page !== 1 && <LayoutToggle />}
        <ThemeToggle />
      </div>
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

const LayoutToggle = () => {
  const current = useAppState(state => state.preferences.layout)
  const next = current === 'mason' ? 'grid' : 'mason'
  const title = next === 'grid' ? 'Snap to grid' : 'Masonry layout'
  const dispatch = useDispatch()
  const toggle = () => dispatch(setLayout(next))

  return (
    <Button
      icon={next}
      noText
      className="mainnav__button"
      title={title}
      onClick={toggle}
    >
      {title}
    </Button>
  )
}

const ThemeToggle = () => {
  const current = useAppState(state => state.preferences.theme)
  const next = current === 'light' ? 'dark' : 'light'
  const title = `Toggle ${next} theme`
  const dispatch = useDispatch()
  const toggle = () => dispatch(setTheme(next))

  return (
    <Button
      icon={next}
      noText
      className="mainnav__button mainnav__theme"
      title={title}
      onClick={toggle}
    >
      {title}
    </Button>
  )
}
