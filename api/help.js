import {
  HTTP
} from '../util/http'
export function addHelp (sid,name,info){
  const http = new HTTP()
  return http.post({
    url: 'help/add',
    data: {
      'sid': sid,
      'name': name,
      'info': info
    },
  })
}
export function getMyHelp (){
  const http = new HTTP()
  return http.get({
    url: 'help/get'
  })
}