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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefreshDown (event) {
      console.log(event)
    },
    onScrollDown (event) {
      console.log('scrollDowm')
    }
  }
})
