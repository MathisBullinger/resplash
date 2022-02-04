import type { Exif, Photo } from 'state/photos'

export const fetchPhotos = async (page = 1): Promise<Photo[]> =>
  (await query('photos', { per_page: 30, page })).map(formatImgData('batch'))

export const fetchPhoto = async (id: string): Promise<Photo> =>
  formatImgData('detailed')(await query(`photos/${id}`))

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

const capitalize = (str?: string) =>
  str && str[0].toUpperCase() + str.slice(1).toLowerCase()

const formatImgData =
  (source: 'batch' | 'detailed') =>
  (data: any): Photo => {
    const filtered: Photo = {
      id: data.id,
      width: data.width,
      height: data.height,
      urls: data.urls,
      title: data.description ?? 'Untitled Photo',
      author: {
        handle: data.user.username,
        name: data.user.name,
        image: data.user.profile_image.medium,
      },
      exif: {
        aperture: data.exif?.aperture,
        iso: data.exif?.iso,
        focal: data.exif?.focal_length,
        exposure: data.exif?.exposure_time,
        make: capitalize(data.exif?.make?.replace(/corp[a-z]*$/i, '')),
        model: data.exif?.model,
      },
      source,
    }

    for (const [k, v] of Object.entries(filtered.exif!))
      if (v === null || v === undefined) delete filtered.exif![k as keyof Exif]

    if (!Object.keys(filtered.exif!).length) delete filtered.exif

    return filtered
  }
