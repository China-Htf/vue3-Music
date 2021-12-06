import tfRequest from '@/axios'
import type { IPlayList } from './type'

export function playListRequest() {
  return tfRequest.get<IPlayList> ({
    url: '/personalized?limit=25'
  })
}