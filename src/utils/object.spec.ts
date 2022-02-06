import { pick, omit, part } from './object'

const obj = { a: 1, b: 2, c: 3, d: 4 }

test('pick', () => {
  expect(pick(obj, 'a', 'c')).toEqual({ a: 1, c: 3 })
})

test('omit', () => {
  expect(omit(obj, 'a', 'c')).toEqual({ b: 2, d: 4 })
})

test('part', () => {
  expect(part(obj, 'a', 'c')).toEqual([
    { a: 1, c: 3 },
    { b: 2, d: 4 },
  ])
})
