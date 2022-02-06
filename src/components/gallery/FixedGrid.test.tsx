import React from 'react'
import { Photo } from 'state/photos'
import { render } from 'test/util'
import Grid from './FixedGrid'

const photos = [...Array(8)]
  .flatMap((_, i) => [
    { width: 100, height: 200, id: `a${i + 1}` },
    { width: 200, height: 100, id: `b${i + 1}` },
  ])
  .map(v => ({ ...v, urls: { regular: v.id } })) as Photo[]

test('renders photos in correct order in 2 columns', () => {
  // prettier-ignore
  expect(getSequence(<Grid columns={2} photos={photos} />)).toEqual([
    'a1', 'b1', 'a2', 'b2', 'a3', 'b3', 'a4', 'b4', 'a5', 'b5', 'a6', 'b6', 'a7', 'b7', 'a8', 'b8'
  ])
})

test('renders photos in correct order in 3 columns', () => {
  // prettier-ignore
  expect(getSequence(<Grid columns={3} photos={photos} />)).toEqual([
    'a1', 'b1', 'a2', 'a3', 'b2', 'b3',
    'a4', 'b4', 'a5', 'a6', 'b5', 'b6',
    'a7', 'b7', 'a8'
  ])
})

test('renders photos in correct order in 4 columns', () => {
  // prettier-ignore
  expect(getSequence(<Grid columns={4} photos={photos} />)).toEqual([
    'a1', 'b1', 'a2', 'b2', 'a3', 'a4', 'b3', 'b4',
    'a5', 'b5', 'a6', 'b6', 'a7', 'a8', 'b7', 'b8'
  ])
})

test('renders photos in correct order in 5 columns', () => {
  // prettier-ignore
  expect(getSequence(<Grid columns={5} photos={photos} />)).toEqual([
    'a1', 'b1', 'a2', 'b2', 'a3', 'a4', 'a5', 'b3', 'b4', 'b5',
    'a6', 'b6', 'a7', 'b7', 'a8'
  ])
})

function getSequence(comp: any) {
  const grid = render(comp).getByRole('list')
  return [...grid.querySelectorAll('img')].map(img => img.getAttribute('src'))
}
