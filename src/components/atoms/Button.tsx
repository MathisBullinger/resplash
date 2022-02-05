import React from 'react'
import { Link } from 'react-router-dom'
import bem from 'utils/bem'
import SVG, { Icon } from './Icon'

type BtProps = {
  onClick?: () => void
  linkTo?: string
  className?: string
  icon?: Icon
  noText?: boolean
}

const Button: React.FC<BtProps> = props => {
  const classes = [bem('button', { notext: props.noText, text: !props.noText })]
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

  if ('linkTo' in props)
    return <BtLink {...{ ...props, className }}>{inner}</BtLink>
  return <BtAction {...{ ...props, className }}>{inner}</BtAction>
}

const BtAction: React.FC<BtProps> = props => (
  <button onClick={props.onClick} className={props.className}>
    {props.children}
  </button>
)

const BtLink: React.FC<BtProps> = props => (
  <Link onClick={props.onClick} className={props.className} to={props.linkTo!}>
    {props.children}
  </Link>
)

export default Button
