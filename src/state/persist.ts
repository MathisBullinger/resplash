import * as idb from './idb'
import state from './store'

let knownLikes: string[] = []

state.subscribe(() => {
  const { favorites: likes, photos } = state.getState()
  if (likes.length === knownLikes.length) return

  const added = likes.filter(id => !knownLikes.includes(id))
  const removed = knownLikes.filter(id => !likes.includes(id))
  knownLikes = [...likes]

  idb.writeFavorites(...added.map(id => photos[id]))
  idb.removeFavorites(...removed)
})

async function hydrate() {
  const photos = await idb.getFavorites()
  state.dispatch({ type: 'photos/hydrateFavorites', payload: photos })
}
hydrate()
