import {
  getSubs
} from '../api/good'
const content = {
  '生活': [],
  '科技': [],
  '运动': [],
  '医学': [],
  '文化': [],
  '家电': []
}

function getAllSubs() {
  getSubs().then(res => {
    let n = normalSub(res)
    wx.setStorageSync('subs', n)
  })
}

function normalSub(subs) {
  for (let i = 0; i < subs.length; i++) {
    let sub = subs[i]
    let contentName = sub.contents.name
    if (findContent(contentName)) {
      let s = {
        values: sub.name,
        index: sub.id
      }
      content[contentName].push(s)
    }
  }
  return content
}

function findContent(content) {
  let name = ['生活', '科技', '运动', '医学', '阳台', '文化', '家电']
  for (let i = 0; i < name.length; i++) {
    let c = name[i]
    if (c === content) {
      return true
    }
  }
}
export {
  getAllSubs,
  normalSub
}