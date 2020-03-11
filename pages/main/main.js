// pages/main/main.js
import {
  HTTP
} from '../../util/http.js'
import {
  creatWeather
} from '../../util/weather.js'
import {
  getWeather
} from '../../api/weather'
import {
  getToken
} from '../../api/token'
import {
  _getUserInfo
} from '../../util/getUser'
const http = new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp: {},
    nickname: '',
    logo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // http.request({
    //   url: 'user',
    //   success: (res) => {
    //     console.log(res.data)
    //   }
    // })
    this.onWeather()
    _getUserInfo().then(res=>{
      const nickname = res.userInfo.nickName
      const logo = res.userInfo.avatarUrl
      this.setData({
        nickname: nickname,
        logo:logo
      })
    }).then(res=>{
      this._login()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  openSetting() {
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.startRecord()
      }
    })
  },
  onGetUserInfo(event) {
    this._login()
  },
  userInfoReadyCallback (res) {
  },
  // 第一次登陆获取token
  _login(){
    wx.login({
      complete: (res) => {
        _getUserInfo().then(res=>{
          const nickname = res.userInfo.nickName
          const logo = res.userInfo.avatarUrl
          this.setData({
            nickname: nickname,
            logo:logo
          })
        })
      },
      success(res){
        if(res.code){
          getToken(res.code).then((res)=>{
            wx.setStorage({
              data: res.token,
              key: 'token',
            })
          })
        }
      }
    })
  },
  onWeather() {
    getWeather().then((res) => {
      this.setData({
        temp: creatWeather(res)
      })
    })
  }
})