import {_getUserInfo} from '../../util/getUser'
import { getUserDetail }from '../../api/user'
import { getContents} from '../../api/good'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  data: {
    logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    room: '0-0-0',
    mobile: '空',
    email: '空',
    star: 0,
    count: 0,
    goods: 0,
    wish: 0
  },
  onLoad: function (options) {
    // 获取content类别并放在缓存中
    getContents().then(res=>{
      wx.setStorageSync('content', res)
    })
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    _getUserInfo().then(res => {
      const nickname = res.userInfo.nickName
      const logo = res.userInfo.avatarUrl
      this.setData({
        nickname: nickname,
        logo: logo
      })
      this._getUserDetail()
    })
  },
  onShow: function () {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    this._getUserDetail()
  },
  // 各种路由
  onMobile() {
    let data = this.data.mobile == '空'? this.data.mobile: JSON.parse(this.data.mobile)
    wx.navigateTo({
      url: '/pages/mobile/mobile',
      events: {
        sendMobile(data) {
          console.log('dengguochao'+data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendMobile', data)
      }
    })
  },
  onEmail() {
    let data = this.data.email
    wx.navigateTo({
      url: '/pages/email/email',
      events: {
        sendEmail(data) {
          console.log('dengguochao'+data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendEmail', data)
      }
    })
  },
  onRoom() {
    wx.navigateTo({
      url: '/pages/room/room',
    })
  },
  onGoods(){
    wx.navigateTo({
      url: '/pages/myGoods/myGoods',
    })
  },
  onWish() {
    wx.navigateTo({
      url: '/pages/myWish/myWish',
    })
  },
  _getUserDetail(){
    getUserDetail().then(res=>{
      let room = res.building == null ? '空':`${res.building}-${res.unit}-${res.room}`
      this.setData({
        room: room,
        mobile: res.mobile|| '空',
        email: res.email || '空',
        star: res.star,
        count: res.count,
        goods: res.goods,
        wish: res.wishes,
      })
    }).then(res=>{
      Toast.clear();
    })
  }
})