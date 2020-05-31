import {
  HTTP
} from '../../util/http.js'
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
  getUserDetail,
  saveUserByNickname,
  saveUserByImage
} from '../../api/user'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const http = new HTTP()
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
    count: 0
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
    }).then(res=>{
      this.onWeather()
    })
  },
  onReady: function () {},
  onShow: function () {
  },
  onGetUserInfo(event) {
    this._login()
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
  onWeather() {
    getWeather().then((res) => {
      this.setData({
        temp: creatWeather(res)
      })
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
  }
})