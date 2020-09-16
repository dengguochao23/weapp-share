function _getLocation () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          wx.getUserInfo({
            success: res => {
              resolve(res)
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '若不授权获取你的位置,不然你用不了天气,亲~',
            showCancel: false,
            confirmText: '知道了',
            success: (res => {
              reject(res)
            })
          })
        }
      },
      fail: rej => {
        wx.showModal({
          title: '失败',
          content: '无法获取地址信息',
          showCancel: false,
          confirmText: '知道了',
          success: (res => {
            reject(res)
          })
        })
      }
    })
  })
}
export {_getLocation}