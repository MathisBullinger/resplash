/** Create an object from `obj` which only includes the properties in `keys` */
export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k]) => keys.includes(k as K))
  ) as Pick<T, K>

/** Create an object from `obj` which doesn't include the properties in `keys` */
export const omit = <T, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k as K))
  ) as Omit<T, K>

export const part = <T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): [selection: Pick<T, K>, rest: Omit<T, K>] => [
  pick(obj, ...keys),
  omit(obj, ...keys),
]
