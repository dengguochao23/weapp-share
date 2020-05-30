// components/scroll/scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number
    },
    refresherEnabled: {
      type: Boolean,
      value: false
    },
    refresherBackground: {
      type: String,
      value: '#FFF'
    },
    data: {
      type: Array,
      observer: function(newVal,oldVal){
        if (newVal.length == this.properties.total){
          this.setData({
            more:false
          })
        }
        this.onRefreshabort()
      }
    },
    total: {
      type: Number
    },
    page: {
      type: Number,
      observer: function(newVal){
        if (newVal*this.properties.prepage>=this.properties.total){
          this.setData({
            more:false
          })
        }
      }
    },
    // 每页的个数
    prepage:{
      type: Number,
      observer: function(newVal){
        if (this.properties.prepage>=this.properties.total){
          this.setData({
            more:false
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    triggered: false, //false表示上拉没被触发，true表上上拉被触发
    more: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //上拉停止
    onRefreshabort() {
      this.setData({
        triggered: false
      })
    },
    // 上来刷新开始
    onPullUp(event) {
      if (this.data.triggered) {
        return
      }
      if(this.data.data.length == this.properties.total){
        return
      }
      this.triggerEvent('onPullUp')
      this.setData({
        triggered: true
      })
      console.log('scrollDowm')
    }
  }
})