/**
 * generate class string including `name` and every modififier which is truthy
 * in `mods`
 */
const bem = (name: string, mods: Record<string, unknown> = {}) =>
  [
    name,
    ...Object.entries(mods)
      .filter(([, v]) => v)
      .map(([mod]) => `${name}--${mod}`),
  ].join(' ')

export default bem
