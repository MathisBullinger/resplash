import React from 'react'
import { Link } from 'react-router-dom'
import bem from 'utils/bem'
import SVG, { Icon } from './Icon'
import * as obj from 'utils/object'

type BtProps = {
  onClick?: () => void
  linkTo?: string
  className?: string
  icon?: Icon
  noText?: boolean
  accent?: boolean
  title?: string
}

const Button: React.FC<BtProps> = props => {
  const classes = [
    bem('button', {
      notext: props.noText,
      text: !props.noText,
      accent: props.accent,
    }),
  ]
  if (props.className) classes.push(props.className)
  const className = classes.join(' ')

  const inner = (
    <>
      {props.icon && <SVG icon={props.icon} className="button__icon" />}
      {props.noText ? (
        <div className="button__label">{props.children}</div>
      ) : (
        props.children
      )}
    </>
  )

  const [known, forward] = obj.part(
    props,
    'onClick',
    'linkTo',
    'className',
    'icon',
    'noText',
    'accent',
    'children'
  )
  const innerProps = { ...known, className, forward }

  if ('linkTo' in props) return <BtLink {...innerProps}>{inner}</BtLink>
  return <BtAction {...innerProps}>{inner}</BtAction>
}

type InnerProps = BtProps & { forward: Record<string, unknown> }

const BtAction: React.FC<InnerProps> = props => (
  <button
    onClick={props.onClick}
    className={props.className}
    {...props.forward}
  >
    {props.children}
  </button>
)

const BtLink: React.FC<InnerProps> = props => (
  <Link
    onClick={props.onClick}
    className={props.className}
    to={props.linkTo!}
    {...props.forward}
  >
    {props.children}
  </Link>
)

export default Button
