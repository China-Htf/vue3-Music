import Cookies from "js-cookie"

const timeKey = 'music-timestamp-key'

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, JSON.stringify(Date.now()))
}