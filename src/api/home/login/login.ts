import tfRequest from "@/axios";
import { IDataType, IPhone } from './type'

// 获取cookie
export function loginPhone(phone: IPhone) {
  return tfRequest.post({
    url: '/login/cellphone',
    data: phone
  })
}
// 获取账户信息
export function requestAccountInfo() {
  return tfRequest.get({
    url: '/user/subcount'
  })
}