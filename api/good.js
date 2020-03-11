import {
  HTTP
} from '../util/http'
export function getSubs() {
  const http = new HTTP()
  return http.get({
    url: 'goods/get/subs'
  })
}
export function getContents () {
  const http = new HTTP()
  return http.get({
    url: 'goods/get/content'
  })
}
export function addGood (sid,cid,name,specification,detail){
  const http = new HTTP()
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
export function getMyGood() {
  const http = new HTTP()
  return http.get({
    url: 'goods/get/mygood'
  })
}