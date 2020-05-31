// components/shop-scroll/shop-scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array
    },
    height: {
      type: Number
    }
  },
  lifetimes: {
    attached() {
      let height = wx.getSystemInfoSync().windowHeight - 50
      this.setData({
        height
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeKey: 0,
    fruit: [],
    vegetables: [],
    scrollTop: 0,
    saveTop: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScroll(event) {
      let current = event.detail.scrollTop

      if (this.data.saveTop.length === 0) {
        const scrollArray = ['#veg', '#fru']
        let temp = this.collectScroll(scrollArray)
        console.log(this.data.saveTop)
        this.setData({
          saveTop: temp
        })
      }
      if (current < this.data.saveTop[1] && current >= this.data.saveTop[0]) {
        this.setData({
          activeKey: 0
        })
      }
      if (current >= this.data.saveTop[1]) {
        this.setData({
          activeKey: 1
        })
      }
    },
    onChange(event) {
      const scrollArray = ['#veg', '#fru']
      let temp = this.collectScroll(scrollArray)
      if (this.data.saveTop.length === 0) {
        setTimeout(() => {
          this.setData({
            saveTop: temp,
            scrollTop: temp[event.detail]
          })
        }, 100)
        return
      }
      this.setData({
        scrollTop: this.data.saveTop[event.detail]
      })
    },
    collectScroll(Array) {
      let temp = []
      Array.forEach((s) => {
        this.createSelectorQuery().select(s).boundingClientRect().exec((res) => {
          temp.push(res[0].top)
        })
      })
      return temp
    }
  }
})