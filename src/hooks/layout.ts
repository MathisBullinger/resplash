import { useState, useEffect } from 'react'
import type { Photo } from 'state/photos'

export function useColumnCount(
  columns: (width: number) => number,
  container = document.body
) {
  const [columnCount, setClCount] = useState(columns(container.offsetWidth))

  const [observer] = useState(
    new ResizeObserver(([{ contentRect }]) => {
      setClCount(columns(contentRect.width))
    })
  )

  useEffect(() => {
    const el = container
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [container, observer])

  return columnCount
}

export function useColumns(numColumns: number, photos: Photo[]) {
  const [columns, setColumns] = useState<Photo[][]>([])

  useEffect(() => {
    setColumns(columns => {
      const oldIds = new Set(
        columns.flatMap(column => column.map(({ id }) => id))
      )
      const newIds = new Set(photos.map(({ id }) => id))

      const newColumns = columns
        .slice(0, numColumns)
        .map(col => col.filter(({ id }) => newIds.has(id)))

      while (newColumns.length < numColumns) newColumns.push([])

      const columnHeights = newColumns.map(col =>
        col.reduce((a, c) => a + c.height / c.width, 0)
      )

      const newPhotos = photos.filter(({ id }) => !oldIds.has(id))

      const smallest = () => columnHeights.indexOf(Math.min(...columnHeights))
      const largest = () => columnHeights.indexOf(Math.max(...columnHeights))

      for (const photo of newPhotos) {
        const i = smallest()
        columnHeights[i] += photo.height / photo.width
        newColumns[i].push(photo)
      }

      // no column should be empty while another column has multiple photos
      while (true) {
        const empty = columns.findIndex(column => column.length === 0)
        const multi = columns.findIndex(column => column.length > 1)
        if (empty < 0 || multi < 0) break
        const photo = columns[multi].pop()!
        columns[empty].push(photo)
        columnHeights[empty] += photo.height / photo.width
        columnHeights[multi] -= photo.height / photo.width
      }

      if (numColumns <= columns.length || !columns.length) return newColumns

      // redistribute photos to newly added columns
      while (true) {
        const from = largest()
        const to = smallest()
        if (from >= columns.length || to < columns.length) break
        const photo = newColumns[from].pop()
        if (!photo) break
        newColumns[to].push(photo)
        columnHeights[from] -= photo.height / photo.width
        columnHeights[to] += photo.height / photo.width
      }

      return newColumns
    })
  }, [numColumns, photos])

  return columns
}
