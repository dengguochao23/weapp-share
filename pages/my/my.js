import {_getUserInfo} from '../../util/getUser'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    room: '103 - 1 - 1502',
    mobile: 13450046634,
    email: 'ole23@qq.com',
    star: 2,
    count: 10,
    goods: 10,
    wish: 5,
    nickname: '请登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getUserInfo().then(res => {
      const nickname = res.userInfo.nickName
      const logo = res.userInfo.avatarUrl
      this.setData({
        nickname: nickname,
        logo: logo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 各种路由
  onMobile() {
    let data = JSON.parse(this.data.mobile)
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
  onGotUserInfo(event) {}
})