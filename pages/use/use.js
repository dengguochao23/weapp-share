import { getGoodByUid }from '../../api/good'
import { createGoods } from '../../models/good'
Page({
  data: {
    logo: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    user: '',
    uid: 0,
    page: 1,
    total: 10,
    goods: []
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendUse',(res)=>{
      this.setData({
        user:res,
        uid: res.id,
        logo: res.image
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getGoodByUid(this.data.uid)
  },
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  _getGoodByUid(uid){
    getGoodByUid(uid).then(res=>{
      const goods = this.data.goods.concat(this.normalGoods(res))
      this.setData({
        goods
      })
    })
  },
  normalGoods(data){
    let t = []
    data.forEach((i)=>{
      t.push(createGoods(i))
    })
    const goodLength = t.length
    this.setData({
      total:goodLength
    })
    return t
  },
  onSelectGood(event){
    const gid = event.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/help-detail/help-detail',
      success: function (res) {
        res.eventChannel.emit('selectGood', gid)
      }
    })
  }
})