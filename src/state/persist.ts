import * as idb from './idb'
import state from './store'

let knownLikes: string[] = []

state.subscribe(() => {
  const photos = state.getState().photos
  if (photos.favorites.length === knownLikes.length) return

  const added = photos.favorites.filter(id => !knownLikes.includes(id))
  const removed = knownLikes.filter(id => !photos.favorites.includes(id))
  knownLikes = [...photos.favorites]

  idb.writeFavorites(...added.map(id => photos.byId[id]))
  idb.removeFavorites(...removed)
})

async function hydrate() {
  const photos = await idb.getFavorites()
  state.dispatch({ type: 'photos/hydrateFavorites', payload: photos })
}
hydrate()
