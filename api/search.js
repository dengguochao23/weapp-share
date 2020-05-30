import {
  HTTP
} from '../util/http'
export function searchGoods(name,page) {
  const http = new HTTP()
  return http.post({
    url: 'search/goods/',
    data: {
      'n': name,
      'p': page
    },
  })
}