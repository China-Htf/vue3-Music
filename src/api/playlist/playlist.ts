import tfRequest from '@/axios'

export function musicURL(id: number) {
  return tfRequest.get ({
    url: `/song/url?id=${id}`
  })
}