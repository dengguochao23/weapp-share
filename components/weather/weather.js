// components/weather/weather.js
Component({
  properties: {
    temp: {
      type: Object
    },
    city: {
      type: String
    }
  },
  data: {
    color: 'good'
  },
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