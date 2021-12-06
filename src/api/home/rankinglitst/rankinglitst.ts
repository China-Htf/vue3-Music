import tfRequest from '@/axios'

export function heiJiaoVip() {
  return tfRequest.get ({
    url: `/playlist/detail?id=5453912201`
  })
}
export function biaoSheng() {
  return tfRequest.get ({
    url: `/playlist/detail?id=19723756`
  })
}
export function xinGe() {
  return tfRequest.get ({
    url: `/playlist/detail?id=3779629`
  })
}
export function yuanChuang() {
  return tfRequest.get ({
    url: `/playlist/detail?id=2884035`
  })
}
export function reGe() {
  return tfRequest.get ({
    url: `/playlist/detail?id=3778678`
  })
}