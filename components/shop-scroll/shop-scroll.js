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
    },
    shopCart: {
      type: Array
    }
  },
  options: {
    styleIsolation: 'shared',
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
        this.setData({
          saveTop: temp
        })
      }
      if (0<current && current<this.data.saveTop[1]){
        this.setData({
          activeKey: 0
        })
      }
      if (this.data.height-this.data.saveTop[1]<current) {
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
    },
    onAdd (event) {
      let shop = event.currentTarget.dataset.shop
      this.triggerEvent('add', shop)
    },
    onLess (event) {
      let shop = event.currentTarget.dataset.shop
      this.triggerEvent('less', shop)
    }
  }
})