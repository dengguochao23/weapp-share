import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function getAllShop(type) {
  return http.get({
    url: `shop/type=${type}`
  })
}