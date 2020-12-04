import {
  creatWeather
} from '../../util/weather.js'
import {
  getWeather
} from '../../api/weather'
import {
  _getUserInfo
} from '../../util/getUser'
import {
  _getLocation
} from '../../util/getLocation'
import {
  geocoder
} from '../../util/map'
import {
  getUserDetail,
  saveUserByNickname,
  saveUserByImage
} from '../../api/user'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
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
    province: '中国',
    // 用于只让获取用户细节的执行一次，而剩下利用下拉刷新的方式获取用户信息
    firstLogin: false
  },
  onLoad: function (options) {
    // 分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    _getLocation().then(res => {
      this._getMyLocation()
    }).catch(rej => {
      this._getMyLocation()
    })
  },
  onPullDownRefresh(){
    this._getUserDetail()
  },
  onShow() {
    if (!this.data.firstLogin) {
      _getUserInfo().then(res => {
        const nickname = res.userInfo.nickName
        const logo = res.userInfo.avatarUrl
        this.setData({
          nickname: nickname,
          logo: logo,
          firstLogin: true
        })
      }).then(res => {
        saveUserByImage(this.data.logo)
        saveUserByNickname(this.data.nickname)
      })
      .then(res => {
        this._getUserDetail()
      })
    }
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
  // 用来获取用户授权后的信息
  _login() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] && wx.getStorageSync('token')) {
          return
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
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
        helps: res.wishes
      })
    }).then(res => {
      Toast.clear();
    }).then(res => {
      wx.stopPullDownRefresh()
    })
  },
  // 天气
  _getWeather(province, city) {
    getWeather(province, city).then((res) => {
      let t = {
        'province': province,
        'city': city,
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
    geocoder(latitude, longitude).then(res => {
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
    app.navigateTo({
      url: '/pages/askForHelp/askForHelp'
    })
  },
  onHot() {
    app.navigateTo({
      url: '/pages/hot/hot',
    })
  },
  onHelp() {
    app.navigateTo({
      url: '/pages/help/help'
    })
  },
  onShop() {
    app.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  onWeather() {
    const that = this
    app.navigateTo({
      url: '/pages/weather/weather',
      success: (res) => {
        res.eventChannel.emit('sendTempFormMain', {
          data: that.data.temp
        })
      }
    })
  },
  onLucky() {
    app.navigateTo({
      url: '/pages/lucky/lucky',
    })
  }
})