import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function getWeather() {
  return http.get({
    url: 'weather',
  })
}