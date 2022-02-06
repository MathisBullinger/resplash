import { clamp } from './math'

test('clamp', () => {
  expect(clamp(3, 1, 8)).toBe(3)
  expect(clamp(8, 1, 3)).toBe(3)
  expect(clamp(3, 5, 8)).toBe(5)
  expect(clamp(8, 5, 3)).toBe(5)
  expect(clamp(3, 20, 8)).toBe(8)
  expect(clamp(8, 20, 3)).toBe(8)
})
