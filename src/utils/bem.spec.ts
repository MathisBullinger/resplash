import bem from './bem'

test('It produces the correct class name', () => {
  expect(bem('foo')).toBe('foo')
})

test('It appends modifiers', () => {
  expect(bem('foo', 'bar')).toBe('foo foo--bar')
  expect(bem('foo', 'bar', 'baz')).toBe('foo foo--bar foo--baz')
})

test('It handles conditional modifiers', () => {
  expect(bem('foo', { bar: false, baz: true })).toBe('foo foo--baz')
})
