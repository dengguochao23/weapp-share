//index.js
//获取应用实例
const app = getApp()
const base64 = require('../libs/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setStorage({
      key: 'token',
      data: 'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU3Njc2NzUxMCwiZXhwIjoxNTc5MzU5NTEwfQ.eyJ1aWQiOjIsInR5cGUiOjEwMCwic2NvcGUiOiJVc2VyU2NvcGUifQ.mbJPgvDzMe5HaBAQcjMCeLUl8UqB9aNp-82h7pjWNYfsE4DxZFz5pFlMNo88USraMsXNZotyrU-VHDCq5PJegw',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onClick() {
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: 'http://127.0.0.1:5000/v1/drift/pending',
          header: {
            'content-type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(res.data + ':')
          },
          method: "GET",
          success(res) {
            console.log(res.data)
          }
        })
      },
    })
  }
})
