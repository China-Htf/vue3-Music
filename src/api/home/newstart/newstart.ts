import tfRequest from '@/axios'

export function newStartRequest(types: number) {
  return tfRequest.get ({
    url: `/top/song?type=${types}`
  })
}