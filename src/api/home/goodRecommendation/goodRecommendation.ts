import tfRequest from '@/axios'

export function newStartRequest() {
  return tfRequest.get ({
    url: `/banner?type=0`
  })
}