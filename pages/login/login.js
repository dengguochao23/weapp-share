import {
  getToken
} from '../../api/token'
import {
  _getUserInfo
} from '../../util/getUser'
import {
  saveUserByNickname,
  saveUserByImage
} from '../../api/user'
let data = {
  nickname: null,
  logo: null
}
Page({
  onGotUserInfo() {
    wx.login({
      complete: (res) => {
        _getUserInfo().then(res => {
           data.nickname = res.userInfo.nickName
           data.logo = res.userInfo.avatarUrl
        }).then(() => {
          saveUserByImage(data.logo)
        }).then(() => {
          saveUserByNickname(data.nickname)
        }).then(()=>{
          wx.navigateBack()
        })
      },
      success: (res) =>{
        if (res.code) {
          getToken(res.code).then((res) => {
            wx.setStorage({
              data: res.token,
              key: 'token',
            })
          })
        }
      }
    })
  }
})