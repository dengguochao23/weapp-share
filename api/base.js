import {
  HTTP
} from '../util/http'
class Base {
  constructor() {
    this.basrUrl = 'http://127.0.0.1:5000/v1/'
  }
  get(url) {
    let http = new HTTP()
    return http.request({
      url: this.basrUrl + url,
    })
  }
}
export {
  Base
}