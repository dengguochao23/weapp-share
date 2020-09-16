import {
  pending,handlePending
} from '../../api/drift'
import {
  createPending
} from '../../models/pending'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {normallArray } from '../../util/normal'
const normalPending = normallArray(createPending)
Page({
  data: {
    page: 1,
    pages: 1,
    total: 1,
    select: 'all',
    pending: []
  },
  onReady: function () {
    this._pending(1, 'all')
  },
  // 标签页的选择
  onSelect(event) {
    let label = event.detail.name
    this.setData({
      pending: []
    })
    this._pending(1, label)
  },
  //数据的收集和处理
  _pending(page, type) {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    pending(page, type).then((res) => {
      let pending = this.data.pending.concat(normalPending(res.data))
      this.setData({
        select: type,
        pending,
        page: page,
        total: res.total,
        pages: res.pages
      })
      Toast.clear();
    })
  },
  onPullUp() {
    let page = this.data.page + 1
    if (this.data.pages >= page) {
      this._pending(page, this.data.select)
    }
  },
  // 各种处理
  onHandle (event) {
    const youare = event.currentTarget.dataset.youare
    const gid = event.currentTarget.dataset.gid
    const id = event.currentTarget.dataset.id
    const pending = event.currentTarget.dataset.pending
    if (!pending) {
      wx.navigateTo({
        url: '/pages/comment/comment',
        success: function (res) {
          res.eventChannel.emit('writeComment', gid)
        }
      })
    } else {
      this._handlePending(id,gid,youare,pending)
    }
  },
  _handlePending(id,gid,youare,pending){
    handlePending(id,gid,youare,pending).then(res=>{
      this.setData({
        pending: []
      })
      this._pending(1, this.data.select)
    })
  }
})