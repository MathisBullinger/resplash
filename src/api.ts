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

export type Photo = {
  id: string
  width: number
  height: number
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}
