import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function addHelp(sid, name, info) {
  return http.post({
    url: 'help/add',
    data: {
      'sid': sid,
      'name': name,
      'info': info
    },
  })
}
export function getMyHelp(page) {
  return http.get({
    url: `help/get/page=${page}`
  })
}
// 10代表取消，11代表生效，12代表删除
export function handleWish(id, type) {
  return http.post({
    url: 'help/handle',
    data: {
      'type': type,
      'id': id
    }
  })
}
export function getAllWish(page) {
  return http.get({
    url: `help/all/page=${page}`
  })
}

export function getAllWishBySid(sid, page) {
  return http.get({
    url: `help/all/sid=${sid}&&page=${page}`
  })
}

export function checkMyGood (name) {
  return http.post({
    url: 'help/check',
    data: {
      'n': name
    }
  })
}