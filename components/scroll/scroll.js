// components/scroll/scroll.js
Component({
  properties: {
    height: {
      type: Number
    },
    refresherEnabled: {
      type: Boolean,
      value: true
    },
    data: {
      type: Array,
      observer: function (newVal, oldVal) {
        if (newVal.length == this.properties.total) {
          this.setData({
            more: false
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
      observer: function (newVal) {
        if (newVal * this.properties.prepage >= this.properties.total) {
          this.setData({
            more: false
          })
        }
      }
    },
    // 每页的个数
    prepage: {
      type: Number,
      observer: function (newVal) {
        if (this.properties.prepage >= this.properties.total) {
          this.setData({
            more: false
          })
        }
      }
    }
  },
  data: {
    triggered: false, //false表示上拉没被触发，true表上上拉被触发
    more: true
  },
  methods: {
    //上拉停止
    onRefreshabort() {
      this.setData({
        triggered: false
      })
    },
    // 上来刷新开始
    onPullUp(event) {
      if (this.data.refresherEnabled) {
        if (this.data.triggered) {
          return
        }
        if (this.data.data.length == this.properties.total) {
          return
        }
        this.triggerEvent('onPullUp')
        this.setData({
          triggered: true
        })
      }
    }
  }
})