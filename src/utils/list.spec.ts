import { zip, alternate, sequence, repeat, take } from './list'

test('zip', () => {
  expect(zip(['a', 'b'], [1, 2])).toEqual([
    ['a', 1],
    ['b', 2],
  ])
  expect(zip(['a', 'b'], [1, 2, 3])).toEqual([
    ['a', 1],
    ['b', 2],
  ])
  expect(zip(['a', 'b', 'c'], [1, 2])).toEqual([
    ['a', 1],
    ['b', 2],
  ])
})

test('alternate', () => {
  expect(alternate(['a', 'b'], [1, 2])).toEqual(['a', 1, 'b', 2])
  expect(alternate(['a', 'b', 'c'], [1, 2])).toEqual(['a', 1, 'b', 2])
  expect(alternate(['a', 'b'], [1, 2, 3])).toEqual(['a', 1, 'b', 2])
})

test('sequence', () => {
  const a = [1, 2, 3, 4, 5, 6]
  const b = [10, 11, 12, 13, 14]

  expect(sequence([[...a], [...b]], [0, 0, 1, 1, 1])).toEqual([
    1, 2, 10, 11, 12, 3, 4, 13, 14,
  ])
})

test('repeat', () => {
  const iter = repeat(1, 2, 3)
  for (let i = 0; i < 100; i++) {
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(2)
    expect(iter.next().value).toBe(3)
  }
})

test('take', () => {
  expect(take(5, repeat(1, 2))).toEqual([1, 2, 1, 2, 1])
})
