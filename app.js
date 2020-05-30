import { getAllSubs } from './util/getSubs'
// import { getContents} from './api/good'
import { getToken} from './api/token'
App({
  onLaunch: function () {
    // 获取subs列表并放在缓存中
    getAllSubs()
    // 获取content类别并放在缓存中
    // getContents().then(res=>{
    //   wx.setStorageSync('content', res)
    // })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // this.globalData.userInfo = res.userInfo
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
              wx.login({
                success(res) {
                  if (res.code) {
                    getToken(res.code).then((res) => {
                      wx.setStorage({
                        data: res.token,
                        key: 'token'
                      })
                    })
                  }
                }
              })
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