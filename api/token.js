import {
  HTTP
} from '../util/http'
export function getToken(code) {
  const http = new HTTP()
  return http.post({
    url: 'token',
    data: {
      'account': code,
      'secret': code,
      'type': 200
    },
  })
}