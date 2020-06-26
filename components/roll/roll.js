Component({
  properties: {
    air: {
      type: Object,
      value: {}
    }
  },
  data: {
    air: '',
    current: 0,
    pre: '',
    next: ''
  },
  ready () {
    this.normalAir(this.properties.air)
    this.setData({
      pre: this.data.air[this.data.current],
      next: this.data.air[this.data.current+1]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    normalAir (data) {
      let temp=[`pm2.5为${data['pm2']}`, `pm10为:${data['pm10']}`, `co为${data['co']}`, `no2为${data['no2']}`, `so2为${data['so2']}`]
      this.setData({
        air: temp
      })
    },
    onStart() {
      setInterval(()=>{
        this.onAmination()
      },3000)
    },
      // 动画
  onAmination () {
    this.setData({
      next: this.data.air[this.data.current+1]
    })
    this.animate('.pre', [
      {translateY: 0, opacity: 1},
      { translateY: -30 , opacity: 0}
    ], 800, function () {
      this.clearAnimation('.pre')
    }.bind(this))
    this.animate('.next', [
      {translateY: 0, opacity: 0},
      { translateY: -30 ,opacity: 1}
    ], 800, function () {
      this.clearAnimation('.next')
      this.setData({
        pre: this.data.air[this.data.current+1],
        current: this.isTotalAir(this.data.current+1)
      })
    }.bind(this))
  },
  isTotalAir(num) {
    let temp = num
    let total = this.data.air.length-1
    if (num===total){
      temp = -1
    }
    return temp
    }
  }
})
