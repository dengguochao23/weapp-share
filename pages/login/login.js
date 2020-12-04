import {
  getToken
} from '../../api/token'
import {
  _getUserInfo
} from '../../util/getUser'
Page({
  onGotUserInfo() {
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
        }
      }
    })
  }
})