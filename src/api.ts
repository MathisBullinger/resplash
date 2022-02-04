import type { Photo } from 'state/photos'

export const fetchImages = (page = 1): Promise<Photo[]> =>
  query('photos', { per_page: 30, page })

async function query(
  path: string,
  params: Record<string, string | number> = {}
) {
  let url = process.env.API_ENDPOINT!
  url += path
  if (Object.keys(params).length)
    url += `?${Object.entries(params)
      .map(p => p.join('='))
      .join('&')}`

  const response = await fetch(url)
  return await response.json()
}
