import {
  HTTP
} from '../util/http'
export function getWeather() {
  const http = new HTTP()
  return http.get({
    url: 'weather',
  })
}