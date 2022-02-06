import * as idb from './idb'
import store from './store'

type State = ReturnType<typeof store.getState>

let knownLikes: string[] = []
function updateFavorites({ photos }: State) {
  if (photos.favorites.length === knownLikes.length) return

  const added = photos.favorites.filter(id => !knownLikes.includes(id))
  const removed = knownLikes.filter(id => !photos.favorites.includes(id))
  knownLikes = [...photos.favorites]

  idb.writeFavorites(...added.map(id => photos.byId[id]))
  idb.removeFavorites(...removed)
}

const initialState = store.getState()
let theme = initialState.preferences.theme
let layout = initialState.preferences.layout

function updatePreferences(state: State) {
  if (state.preferences.theme !== theme) {
    theme = state.preferences.theme
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }

  if (state.preferences.layout !== layout) {
    layout = state.preferences.layout
    localStorage.setItem('layout', layout)
  }
}

async function hydrateFavorites() {
  const photos = await idb.getFavorites()
  knownLikes.push(...photos.map(({ id }) => id))
  store.dispatch({ type: 'photos/hydrateFavorites', payload: photos })
}

hydrateFavorites()

store.subscribe(() => {
  const state = store.getState()
  updateFavorites(state)
  updatePreferences(state)
})
