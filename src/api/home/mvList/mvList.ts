import tfRequest from '@/axios'

export function mvList() {
  return tfRequest.get ({
    url: `/top/mv?limit=10`
  })
}
