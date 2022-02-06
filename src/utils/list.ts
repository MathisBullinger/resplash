/** Take two lists and return a list of corresponding pairs. */
export const zip = <A, B>(a: A[], b: B[]): [A, B][] =>
  [...Array(Math.min(a.length, b.length))].map((_, i) => [a[i], b[i]])

/** Create a list which alternates between the elements of the two given lists. */
export const alternate = <A, B>(a: A[], b: B[]) => zip(a, b).flat()

/**
 * Split a list into two lists:
 * - the first including all elements for which `predicate` is truthy
 * - the second including all elements for which `predicate` is falsy
 */
export const partition = <T>(
  list: T[],
  predicate: (el: T) => boolean
): [T[], T[]] => {
  const parts: [T[], T[]] = [[], []]
  for (const item of list) parts[predicate(item) ? 0 : 1].push(item)
  return parts
}

/**
 * Combine the input lists using the given sequence until any of the input
 * lists is empty.
 */
export const sequence = <T>(lists: T[][], indexSequence: number[]) => {
  const sequential: T[] = []
  while (true) {
    for (const i of indexSequence) {
      if (!lists[i].length) return sequential
      sequential.push(lists[i].shift()!)
    }
  }
}

/** Return an infinite iterator that repeats the elements in `xs`. */
export const repeat = <T>(...xs: [T, ...T[]]): Iterator<T> => {
  let i = 0
  return {
    next: () => ({
      value: xs[i++ % xs.length],
    }),
  }
}

/** Take `n` items from an iterator. */
export const take = <T>(n: number, list: Iterator<T>): T[] =>
  [...Array(n)].map(() => list.next().value)
