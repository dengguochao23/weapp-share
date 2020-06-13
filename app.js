import { getAllSubs } from './util/getSubs'
import { getToken} from './api/token'
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
  },
  globalData: {
    userInfo: null
  }
})