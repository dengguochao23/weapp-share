import {
  getAllUser,
  ranking
} from '../../api/user'
Page({
  data: {
    page: 1,
    total: 1,
    allUser: [],
    ranking: 1
  },
  onLoad: function (options) {
    this._getAllUser(1)
    this._ranking()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  _getAllUser(page) {
    getAllUser(page).then(res => {
      let allUser = this.data.allUser.concat(res.data)
      this.setData({
        total: res.total,
        page: res.page,
        allUser: allUser
      })
    })
  },
  _ranking() {
    ranking().then(res => {
      this.setData({
        ranking: res.ranking+1
      })
    })
  },
  onSelect(event){
    const data = event.currentTarget.dataset.user
    // 当前选择的ID
    const id = event.currentTarget.dataset.index 
    if (id===this.data.ranking){
      wx.navigateTo({
        url: '/pages/myGoods/myGoods',
      })
    }else{
      wx.navigateTo({
        url: '/pages/use/use',
        success: function (res) {
          res.eventChannel.emit('sendUse', data)
        }
      })
    }
  }
})