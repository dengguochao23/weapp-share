import {
  getGoodByGid
} from '../../api/good'
import {
  createGoods
} from '../../models/good'
import {
  checkDriftByid,
  cancalDriftByid,
  createDriftFromHelper
} from '../../api/drift'
const step = {
  0: {
    status: '等待你的提交',
    next: '提交成功',
    nextinfo: '请耐心等待用户的审核'
  },
  1: {
    status: '提交成功',
    next: '用户审核',
    nextinfo: '请耐心等待用户的审核'
  },
  2: {
    status: '用户审核通过',
    next: '物业领取',
    nextinfo: '等待物业通知您过来领取'
  },
  3: {
    status: '撤回',
    next: '提交审核',
    nextinfo: '等待你的再次提交'
  },
  4: {
    status: '用户决绝你的申请',
    next: '等待用户再次提交',
    nextinfo: '等待用户再次提交'
  },
  5: {
    status: '物品领取',
    next: '完成',
    nextinfo: '完成整个流程'
  },
  6: {
    status: '完成',
    next: '评论',
    nextinfo: '等待你的评论'
  },
  7: {
    status: '评论完成',
    next: '谢谢',
    nextinfo: '期待你的再次提交'
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: 3,
    gid: 0,
    status: step['0'].status,
    next: step['0'].next,
    nextinfo: step['0'].nextinfo,
    good: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('selectGood', (res) => {
      this.setData({
        gid: res
      })
      this._getGoodByGid(res)
    })
    this.__checkDriftById(this.data.gid)
  },
  _getGoodByGid(gid) {
    getGoodByGid(gid).then(res => {
      this.setData({
        good: createGoods(res)
      })
    })
  },
  // 提交申请
  onSubmitReview() {
    createDriftFromHelper(this.data.gid, this.data.good.name, this.data.good.user.id, 5).then((res) => {
      this.setData({
        status: step['1'].status,
        next: step['1'].next,
        nextinfo: step['1'].nextinfo
      })
    })
  },
  // 取消申请
  onCancalDrift() {
    cancalDriftByid(this.data.gid).then((res) => {
      this.__checkDriftById(this.data.gid)
    })
  },
  // 检查申请情况
  __checkDriftById(gid) {
    checkDriftByid(gid).then((res) => {
      let good = res
      let pending = good.pending
      switch (pending) {
        case 1:
          this.setData({
            status: step['1'].status,
            next: step['1'].next,
            nextinfo: step['1'].nextinfo
          })
          break
        case 5:
          this.setData({
            status: step['5'].status,
            next: step['5'].next,
            nextinfo: step['5'].nextinfo
          })
          break
        case 2:
          this.setData({
            status: step['2'].status,
            next: step['2'].next,
            nextinfo: step['2'].nextinfo
          })
          break
        case 3:
          this.setData({
            status: step['3'].status,
            next: step['3'].next,
            nextinfo: step['3'].nextinfo
          })
          break
        case 4:
          this.setData({
            status: step['4'].status,
            next: step['4'].next,
            nextinfo: step['4'].nextinfo
          })
          break
        case 6:
          this.setData({
            status: step['6'].status,
            next: step['6'].next,
            nextinfo: step['6'].nextinfo
          })
          break
        case 7:
          this.setData({
            status: step['7'].status,
            next: step['7'].next,
            nextinfo: step['7'].nextinfo
          })
          break
      }
    }).catch((e) => {
      this.setData({
        status: step['0'].status,
        next: step['0'].next,
        nextinfo: step['0'].nextinfo
      })
    })
  }
})