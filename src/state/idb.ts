import type { Photo } from './photos'

const storeName = 'favorites'
const db = openDB()

async function openDB(): Promise<IDBDatabase> {
  return await new Promise(res => {
    const request = indexedDB.open(window.location.host)
    request.onsuccess = () => {
      res(request.result)
    }
    request.onupgradeneeded = e => createStores((e.target as any).result)
  })
}

async function createStores(db: IDBDatabase) {
  await new Promise(res => {
    db.createObjectStore(storeName, {
      keyPath: 'id',
    }).transaction.oncomplete = res
  })
}

const writeTransaction = async () =>
  // @ts-ignore options argument missing from transaction typings
  (await db).transaction(storeName, 'readwrite', {
    durability: 'relaxed',
  })

const waitComplete = async (tx: IDBTransaction) =>
  await new Promise(res => {
    tx.oncomplete = res
  })

export async function writeFavorites(...photos: Photo[]) {
  const tx = await writeTransaction()
  const store = tx.objectStore(storeName)
  photos.forEach(photo => store.add(photo))
  await waitComplete(tx)
}

export async function removeFavorites(...ids: string[]) {
  const tx = await writeTransaction()
  const store = tx.objectStore(storeName)
  ids.forEach(id => store.delete(id))
  await waitComplete(tx)
}

export async function getFavorites(): Promise<Photo[]> {
  const tx = (await db).transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  const request = store.getAll()
  await waitComplete(tx)
  return request.result
}
