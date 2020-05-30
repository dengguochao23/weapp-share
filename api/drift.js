import {
  HTTP
} from '../util/http'
const http = new HTTP()
export function checkDriftByid(gid) {
  return http.get({
    url: `drift/gid=${gid}`
  })
}
export function cancalDriftByid(gid) {
  return http.post({
    url: `drift/cancal/gid=${gid}`
  })
}
export function createDriftFromHelper(gid, name, shareId, count) {
  return http.post({
    url: 'drift/create/helper',
    data: {
      'gid': gid,
      'name': name,
      'uid': shareId,
      'count': count
    }
  })
}
export function createDriftFromSharer (wishid, gid, name, helperId, count) {
  return http.post({
    url: 'drift/create/sharer',
    data: {
      'id': wishid,
      'gid': gid,
      'name': name,
      'uid': helperId,
      'count': count
    }
  })
}

export function pending(page, type) {
  return http.get({
    url: `drift/pending/page=${page}&&type=${type}`
  })
}

export function handlePending(id, gid, youare, pending) {
  return http.post({
    url: 'drift/handle',
    data: {
      'id': id,
      'gid': gid,
      'youare': youare,
      'pending': pending
    }
  })
}