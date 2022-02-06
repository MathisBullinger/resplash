/**
 * generate class string including `name` and every modififier which is truthy
 * in `mods`
 */
const bem = (name: string, ...mods: (Record<string, unknown> | string)[]) =>
  [
    name,
    ...mods
      .flatMap(group =>
        typeof group === 'string'
          ? [group]
          : Object.entries(group)
              .filter(([, v]) => v)
              .map(([mod]) => mod)
      )
      .map(mod => `${name}--${mod}`),
  ].join(' ')

export default bem
