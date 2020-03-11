import { getAllSubs } from './util/getSubs'
import { getContents} from './api/good'
App({
  onLaunch: function () {
    // 获取subs列表并放在缓存中
    getAllSubs()
    // 获取content类别并放在缓存中
    getContents().then(res=>{
      wx.setStorageSync('content', res)
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {}
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // wx.showModal({
          //   title: '提示',
          //   content: '若不授权微信登录，则无法使用小程序。点击"授权"按钮并允许使用"用户信息"方可正常使用。',
          //   showCancel: false,
          //   confirmText: '授权',
          //   success: (res => {
          //     wx.openSetting({
          //       scope: "scope.userInfo",
          //       success: (res) => {
          //       }
          //     })
          //   })
          // })
        }
      },
      fail: rej => {
        console.log('sdfsdfsdf')
      }
    })
  },
  globalData: {
    userInfo: null
  }
})