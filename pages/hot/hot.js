import {
  getAllUser,
  ranking
} from '../../api/user'
const app = getApp()
Page({
  data: {
    page: 1,
    pages: 1,
    total: 1,
    allUser: [],
    ranking: 1
  },
  onLoad: function (options) {
    this._getAllUser(1)
    this._ranking()
  },
  _getAllUser(page) {
    getAllUser(page).then(res => {
      let allUser = this.data.allUser.concat(res.data)
      this.setData({
        total: res.total,
        page: res.page,
        pages: res.pages,
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
      app.navigateTo({
        url: '/pages/myGoods/myGoods',
      })
    }else{
      app.navigateTo({
        url: '/pages/use/use',
        success: (res) => {
          res.eventChannel.emit('sendUse', data)
        }
      })
    }
  },
  onPullUp(e) {
    let page = this.data.page + 1
    if (this.data.pages >= page) {
      this._getAllUser(page)
    }
  }
})