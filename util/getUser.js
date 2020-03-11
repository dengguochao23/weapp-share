function _getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              resolve(res)
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
      },
      fail: rej => {
        reject(rej)
      }
    })
  })
}
export {_getUserInfo}