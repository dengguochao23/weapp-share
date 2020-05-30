import {
  pending,handlePending
} from '../../api/drift'
import {
  createPending
} from '../../models/pending'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pages: 1,
    total: 1,
    select: 'all',
    pending: []
  },
  onLoad: function (options) {
  },
  onReady: function () {
    this._pending(1, this.data.select)
  },
  onShow: function () {
  },
  // 标签页的选择
  onSelect(event) {
    let label = event.detail.name
    switch (label) {
      case 'all':
        this.setData({
          select: label,
          pending: []
        })
        this._pending(1, this.data.select)
        break
      case 'helper':
        this.setData({
          select: label,
          pending: []
        })
        this._pending(1, this.data.select)
        break
      case 'sharer':
        this.setData({
          select:label,
          pending: []
        })
        this._pending(1, this.data.select)
        break
    }
  },
  //数据的收集和处理
  _pending(page, type) {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    pending(page, type).then((res) => {
      let pending = this.data.pending.concat(this.normalPending(res.data))
      this.setData({
        pending,
        page: page,
        total: res.total,
        pages: res.pages
      })
      Toast.clear();
    })
  },
  normalPending(data) {
    let temp = []
    data.forEach((d) => {
      temp.push(createPending(d))
    })
    return temp
  },
  onPullUp() {
    let page = this.data.page + 1
    if (this.data.pages >= page) {
      this._pending(page, this.data.select)
    }
  },
  // 各种处理
  onCancel(event){
    const youare = event.currentTarget.dataset.youare
    const gid = event.currentTarget.dataset.gid
    const id = event.currentTarget.dataset.id
    const pending = 3
    this._handlePending(id,gid,youare,pending)
  },
  onConfirm(event){
    const youare = event.currentTarget.dataset.youare
    const gid = event.currentTarget.dataset.gid
    const id = event.currentTarget.dataset.id
    const pending = 2
    this._handlePending(id,gid,youare,pending)
  },
  onRefuser(event){
    const youare = event.currentTarget.dataset.youare
    const gid = event.currentTarget.dataset.gid
    const id = event.currentTarget.dataset.id
    const pending = 4
    this._handlePending(id,gid,youare,pending)
  },
  onComment(event){
    const gid = event.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/comment/comment',
      success: function (res) {
        res.eventChannel.emit('writeComment', gid)
      }
    })
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