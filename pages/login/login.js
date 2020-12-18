import {
  getToken
} from '../../api/token'
import {
  _getUserInfo
} from '../../util/getUser'
Page({
  onGotUserInfo(res) {
    let detail = res.detail
    // 假如有用户数据意味着用户授权成功
    if (detail.userInfo) {
      wx.login({
        success: (res) => {
          if (res.code) {
            getToken(res.code).then((res) => {
              wx.setStorage({
                key: 'token',
                data: res.token
              })
            }).then(() => {
              wx.navigateBack()
            })
          } else {
            console.log('ee')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '若不授权微信登录，则无法使用小程序。点击"头像"按钮并允许使用"用户信息"方可正常使用。',
        showCancel: false,
        confirmText: '知道了',
        success: (res => {})
      })
    }
  }
})