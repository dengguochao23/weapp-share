import { Rain, Star, Cloud,Sunny, Smog, Snow} from '../../util/particle'
Page({
  data: {
    // air: {'province': "广东省", 'city': "东莞市", 'degree': 28, 'weather': "晴", "quality": "良", "pm2": 33, "co": 0.6, "no2": 14, "so2": 12, "pm10": 51},
    air: {},
    width: 0,
    height:0
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendTempFormMain', (data)=>{
      this.setData({
        air: data.data
      })
    })
    wx.getSystemInfo({
      success: (res)=>{
        let width = res.windowWidth
        let height = res.windowHeight
        this.setData({
          width,
          height
        })
      }
    })
  },
  onReady() {
    // 用来获取canvas 官网文档要求这样设置
    const query = wx.createSelectorQuery()
    query.select('#effect')
    .fields({ node: true, size: true })
    .exec((res)=>{
      const canvas = res[0].node
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      this.judge(ctx, this.data.air.weather)
    })
  },
  onShow: function () {
    const roll = this.selectComponent('.roll')
    roll.onStart()
  },
  judge (ctx, weather) {
    let date = new Date()
    let hour = date.getHours()
    if (weather==='大雨'||weather === '暴雨'){
      this.rain(ctx,100)
    }
    if (weather ==='中雨'){
      this.rain(ctx, 50)
    }
    if (weather === '小雨' || weather==='阵雨' || weather === '雨') {
      this.rain(ctx, 10)
    }
    if (weather === '多云'){
      this.cloud(ctx, 10)
    }
    if (weather ==='阴'){
      this.cloud(ctx, 1)
    }
    if (weather ==='晴'){
      if (hour<19&&hour>7){
        this.sunny(ctx)
      }else{
        this.star(ctx)
      }
    }
    if (weather === '雾') {
      this.smog(ctx)
    }
    if (weather === '雪') {
      this.snow(ctx)
    }
  },
  rain(ctx,amount) {
    let {width, height} = this.data
    let rain = new Rain(ctx, width, height, {
      amount: amount,
      speedFactor: 0.03
    })
    rain.run()
  },
  star(ctx) {
    let {width, height} = this.data
    let star = new Star(ctx, width, height, {
      amount: 30
    })
    star.run()
  },
  cloud(ctx, amount) {
    let {width, height} = this.data
    let cloud = new Cloud(ctx, width, height, {
      amount: amount
    })
    cloud.run()
  },
  sunny(ctx){
    let {width, height} = this.data
    let sunny = new Sunny(ctx,width,height)
    sunny.run()
  },
  smog(ctx) {
    let {width, height} = this.data
    let smog = new Smog(ctx,width,height)
    smog.run()
  },
  snow(ctx) {
    let {width, height} = this.data
    let snow = new Snow(ctx, width, height)
    snow.run()
  }
})