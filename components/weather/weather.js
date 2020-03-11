// components/weather/weather.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    temp: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    temp: {},
    color: 'good'
  },
  /**
   * 组件的方法列表
   */
  methods: {},
  observers: {
    'temp' : function (temp) {
      switch (temp.quality) {
        case '良':
          this.setData({
            color: 'good'
          })
          break
        case '优':
          this.setData({
            color: 'excellent'
          })
          break
        case '轻度污染':
          this.setData({
            color: 'light-pollution'
          })  
      }
    }
  }
})