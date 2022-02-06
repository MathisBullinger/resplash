import React from 'react'
import { render } from 'test/util'
import Icon, { paths } from './Icon'

test('has expected attributes', () => {
  const icon = render(<Icon icon="close" className="test" />).getByRole('img')

  expect(icon).toHaveClass('icon', 'icon__close', 'test')
  expect(icon).toHaveAttribute('width')
  expect(icon).toHaveAttribute('height')
  expect(icon).toHaveAttribute('viewBox')
  expect(icon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
})

test('renders correct path', () => {
  const icon = render(<Icon icon="dark" />).getByRole('img')
  const path = icon.querySelector('path')
  expect(path).toHaveAttribute('d', paths.dark)
})
