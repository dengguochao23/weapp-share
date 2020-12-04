import {
  config
} from '../config.js'
import {
  Base64
} from './base64.js'
const tips = {
  1000: '验证失败',
  1001: '用户名已经被注册了',
  1002: '备注名已经被注册了',
  1003: 'token是非法的',
  1004: '该房号已经有人注册了',
  1005: '拒绝访问',
  1006: '没找到任何东西',
  1007: '亲，重复提交了',
  1008: '亲，发现有相同的物品'
}
class HTTP {
  get({url}) {
    return new Promise((resolve, reject) => {
      this._request(resolve, reject, url, "GET")
    })
  }
  post({url,data}){
    return new Promise((resolve,reject)=>{
      this._request(resolve,reject,url,"POST",data)
    })
  }
  _request(resolve, reject, url, method, data = {}) {
    let user = wx.getStorageSync('token')
    // 防止重复提交
    if (method === 'POST') {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + Base64.encode(user + ':')
      },
      success: (res) => {
        if (res.data.error_code) {
          let error_code = res.data.error_code
          if (error_code === 1003) {
            setTimeout( ()=> {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }, 500)
          }
          reject(tips[error_code])
        } else {
          resolve(res.data)
        }
        if (method === 'POST') {
          wx.hideLoading()
        }
      },
      fail: (error) => {
        wx.showModal({
          title: '失败',
          content: '服务器有问题，请稍候再试',
          showCancel: false,
          success: (res => {
            reject(res)
          })
        })
      }
    })
  }
}

export {
  HTTP
}