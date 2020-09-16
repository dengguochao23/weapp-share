import {
  creatWeather
} from '../../util/weather.js'
import {
  getWeather
} from '../../api/weather'
import {
  getToken
} from '../../api/token'
import {
  _getUserInfo
} from '../../util/getUser'
import {
  _getLocation
} from '../../util/getLocation'
import { geocoder } from '../../util/map'
import {
  getUserDetail,
  saveUserByNickname,
  saveUserByImage
} from '../../api/user'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  data: {
    temp: {},
    nickname: '',
    logo: '',
    room: '0-0-0',
    count: 0,
    goods: 0,
    wishes: 0,
    comment: 0,
    count: 0,
    city: '中国',
    province: '中国'
  },
  onLoad: function (options) {
    _getUserInfo().then(res => {
      const nickname = res.userInfo.nickName
      const logo = res.userInfo.avatarUrl
      this.setData({
        nickname: nickname,
        logo: logo
      })
    }).then(res => {
      this._getUserDetail()
    })
    _getLocation().then(res=>{
      this._getMyLocation()
    }).catch(rej => {
      this._getMyLocation()
    })
    // 分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onGetUserInfo(event) {
    this._login()
  },
  onShareAppMessage() {
    return {
      title: '分享一个好玩的小程序给你们',
      path: '/pages/main/main'
    }
  },
  // 第一次登陆获取token
  _login() {
    wx.login({
      complete: (res) => {
        _getUserInfo().then(res => {
          const nickname = res.userInfo.nickName
          const logo = res.userInfo.avatarUrl
          this.setData({
            nickname: nickname,
            logo: logo
          })
          this._getUserDetail()
          saveUserByNickname(nickname)
          saveUserByImage(logo)
        })
      },
      success(res) {
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
  },
  // 获取用户详情
  _getUserDetail() {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    getUserDetail().then(res => {
      let room = res.building == null ? '空' : `${res.building}-${res.unit}-${res.room}`
      this.setData({
        room: room,
        count: res.count,
        goods: res.goods,
        comment: res.comment,
        helps: res.helps
      })
    }).then(res => {
      Toast.clear();
    })
  },
  // 天气
  _getWeather(province, city) {
    getWeather(province, city).then((res) => {
      let t = {
        'province': province,
        'city':city,
        'air': res.air,
        'temp': res.temp
      }
      this.setData({
        temp: creatWeather(t)
      })
    })
  },
  // 读取地图地址
  _getMyLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.updateLoacation
    })
  },
  updateLoacation(res) {
    const latitude = res.latitude
    const longitude = res.longitude
    wx.showLoading({
      title: '定位中',
      mask: true
    })
    geocoder(latitude, longitude).then(res=>{
      wx.hideLoading({
        complete: (res) => {},
      })
      let city = res.ad_info.city
      let province = res.ad_info.province
      this.setData({
        province,
        city
      })
      this._getWeather(province, city)
    })
  },
  // 各种路由
  onAskForHelp() {
    wx.navigateTo({
      url: '/pages/askForHelp/askForHelp',
    })
  },
  onHot () {
    wx.navigateTo({
      url: '/pages/hot/hot',
    })
  },
  onHelp() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  onShop(){
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  onWeather() {
    const that = this
    wx.navigateTo({
      url: '/pages/weather/weather',
      success(res){
        res.eventChannel.emit('sendTempFormMain', { data: that.data.temp})
      }
    })
  }
})