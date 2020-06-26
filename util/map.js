const QQ_MAP_KEY = 'UBNBZ-JSO6X-AUW4A-Z4FS2-447BT-H6BFG'

export const geocoder = (lat, lon)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        key: QQ_MAP_KEY,
        location: `${lat},${lon}`,
        get_poi: 1
      },
      success: (res)=>{
        let result = res.data.result
        if (res.statusCode === 200 && result) {
          resolve(result)
        }
      }
    })
  })
}