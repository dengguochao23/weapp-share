import {
  getSubs
} from '../api/good'
const content = {
  '生活': [],
  '厨房': [],
  '科技': [],
  '客厅': [],
  '阳台': [],
  '洗手间': [],
  '体育': []
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
  let name = ['生活', '厨房', '科技', '客厅', '阳台', '洗手间', '体育']
  for (let i = 0; i < name.length; i++) {
    let c = name[i]
    if (c === content) {
      return true
    }
  }
}
export {
  getAllSubs
}