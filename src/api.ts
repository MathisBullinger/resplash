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
      date: new Date(data.created_at).getTime(),
      width: data.width,
      height: data.height,
      urls: data.urls,
      color: data.color,
      title:
        data.description ??
        data.alt_description ??
        data.location?.title ??
        'Untitled Photo',
      author: {
        handle: data.user.username,
        name: data.user.name,
        image: data.user.profile_image.medium,
      },
      exif: {
        aperture: format('aperture', data.exif?.aperture),
        iso: data.exif?.iso,
        focal: format('focal', data.exif?.focal_length),
        exposure: data.exif?.exposure_time,
        make: format('make', data.exif?.make),
        model: data.exif?.model,
      },
      source,
    }

    for (const [k, v] of Object.entries(filtered.exif!))
      if (v === null || v === undefined) delete filtered.exif![k as keyof Exif]

    if (!Object.keys(filtered.exif!).length) delete filtered.exif

    return filtered
  }

const formatters = {
  make: (str: string) => capitalize(str.replace(/corp[a-z]*$/i, '')),
  aperture: (str: string) => 'f/' + str.replace(/^\s*(f\/)?/, ''),
  focal: (str: string) => (/\d$/.test(str) ? `${str}mm` : str),
}

const format = (key: keyof typeof formatters, value?: string) => {
  if (typeof value !== 'string') return value
  return formatters[key](value)
}
