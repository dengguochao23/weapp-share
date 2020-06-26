import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function getWeather(province, city) {
  return http.post({
    url: 'weather',
    data: {
      "province": province,
      "city": city
    }
  })
}