import moment from '../miniprogram_npm/moment/moment'
moment.locale('zh-cn')
class Comment {
  constructor ({ time, id,gid, content, star, uid, username, userLogo}) {
    this.time = this.normalTime(time)
    this.id = id
    this. gid= gid
    this.content = content
    this.star = star
    this.uid = uid
    this.username = username
    this.userLogo = userLogo
  }
  normalTime (time) {
    let day = moment.unix(time)
    return day.format('LL')
  }
}
export function createComments (data) {
  return new Comment({
    time: data.create_time,
    id: data.id,
    gid: data.gid,
    content: data.content,
    star: data.star,
    uid: data.uid,
    username: data.user['nickname'],
    userLogo: data.user['image']
  })
}