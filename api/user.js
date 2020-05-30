import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function getUserDetail (){
  return http.get({
    url: `user`
  })
}
export function getAllUser(page){
  return http.get({
    url: `user/all/page=${page}`
  })
}
export function saveUserByRoom(build,unit,room) {
  return http.post({
    url: 'user/save/room',
    data: {
      'building': build,
      'unit': unit,
      'room': room
    },
  })
}
export function saveUserByMobile(mobile) {
  return http.post({
    url: 'user/save/mobile',
    data: {
      'mobile': mobile
    },
  })
}
export function saveUserByEmail(email) {
  return http.post({
    url: 'user/save/email',
    data: {
      'email': email
    },
  })
}
export function saveUserByNickname(nickname) {
  return http.post({
    url: 'user/save/nickname',
    data: {
      'nickname': nickname
    },
  })
}
export function saveUserByImage(img) {
  return http.post({
    url: 'user/save/image',
    data: {
      'image': img
    },
  })
}
export function ranking () {
  return http.get({
    url: 'user/ranking'
  })
}