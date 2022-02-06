import React from 'react'
import { render } from 'test/util'
import Button from './Button'

test('renders a link if linkTo is supplied', () => {
  const { container } = render(<Button id="bt-test" linkTo="foo" />)
  expect(container.querySelector('#bt-test')).toBeInstanceOf(HTMLAnchorElement)
})

test('renders a button if linkTo is not supplied', () => {
  const { container } = render(<Button id="bt-test" />)
  expect(container.querySelector('#bt-test')).toBeInstanceOf(HTMLButtonElement)
})

test('forwards additional properties', () => {
  expect(
    render(<Button data-foo></Button>).getByRole('button')
  ).toHaveAttribute('data-foo')

  expect(
    render(<Button data-foo linkTo="/"></Button>).getByRole('link')
  ).toHaveAttribute('data-foo')
})

test('renders text', () => {
  expect(render(<Button>foo</Button>).getByRole('button')).toHaveTextContent(
    'foo'
  )

  expect(
    render(<Button noText>foo</Button>).getByRole('button')
  ).toHaveTextContent('foo')

  expect(
    render(<Button linkTo="/">foo</Button>).getByRole('link')
  ).toHaveTextContent('foo')

  expect(
    render(
      <Button linkTo="/" noText>
        foo
      </Button>
    ).getByRole('link')
  ).toHaveTextContent('foo')
})

test('invokes onClick handler', () => {
  {
    const onClick = jest.fn()
    render(<Button onClick={onClick} />)
      .getByRole('button')
      .click()
    expect(onClick).toHaveBeenCalled()
  }
  {
    const onClick = jest.fn()
    render(<Button onClick={onClick} linkTo="/" />)
      .getByRole('link')
      .click()
    expect(onClick).toHaveBeenCalled()
  }
})
