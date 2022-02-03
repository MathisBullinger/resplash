import { useState, useEffect } from 'react'
import type { Photo } from 'api'

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
      const newColumns = columns
        .slice(0, numColumns)
        .map(col => col.filter(img => photos.includes(img)))

      while (newColumns.length < numColumns) newColumns.push([])

      const columnHeights = newColumns.map(col =>
        col.reduce((a, c) => a + c.height / c.width, 0)
      )

      const newPhotos = photos.filter(
        photo => !newColumns.some(column => column.includes(photo))
      )

      const smallest = () => columnHeights.indexOf(Math.min(...columnHeights))
      const largest = () => columnHeights.indexOf(Math.max(...columnHeights))

      for (const photo of newPhotos) {
        const i = smallest()
        columnHeights[i] += photo.height / photo.width
        newColumns[i].push(photo)
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
