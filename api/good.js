import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function getSubs() {
  return http.get({
    url: 'goods/get/subs'
  })
}
export function getContents () {
  return http.get({
    url: 'goods/get/content'
  })
}
export function addGood (sid,cid,name,specification,detail){
  return http.post({
    url: 'goods/add/good',
    data: {
      'cid': cid,
      'sid': sid,
      'name': name,
      'specification': specification,
      'detail': detail
    },
  })
}
export function getMyGood(page) {
  return http.get({
    url: `goods/get/mygood/page=${page}`
  })
}
// 10代表取消，11代表生效，12代表删除
export function handleGood(gid,type) {
  return http.post({
    url: 'goods/handle/good',
    data: {
      'type': type,
      'gid': gid
    }
  })
}
export function getGoodByGid(gid) {
  return http.post({
    url: 'goods/get/good',
    data: {
      'gid': gid
    }
  })
}
export function getGoodByUid(uid){
  return http.get({
    url: `goods/get/uid=${uid}`
  })
}