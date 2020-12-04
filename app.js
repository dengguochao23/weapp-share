import {
  getAllSubs
} from './util/getSubs'
import {
  getToken
} from './api/token'
let globalData = {
  url: null,
}
App({
  onLaunch: function () {
    // 获取subs列表并放在缓存中
    getAllSubs()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
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
        }
      },
      fail: rej => {
        console.log('error')
      }
    })
    this.proxy()
  },
  onShow: function () {
  },
  // 类似vue-router中的路由卫士
  // 利用监测url的变化也就是路由的变化，来监测是否有用户的授权，没授权的就返回登陆页面
  proxy () {
    Object.defineProperty(globalData, 'url', {
      get: function (val) {
        return val
      },
      set: function (newValue) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              wx.navigateTo({
                url: newValue,
                success: globalData['success']
              })
            } else {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }
    })
  },
  navigateTo(arg) {
    globalData.url = arg.url
    globalData.success = arg.success
  }
})