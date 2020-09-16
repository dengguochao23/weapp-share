// components/cart-control/cart-control.js
Component({
  properties: {
    num: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 10
    }
  },
  methods: {
    onAdd(){
      let currentNum = this.properties.num+1
      if (this.properties.max >= currentNum) {
        this.setData({
          num: currentNum
        })
        this.triggerEvent('add', this.properties.num)
      } else {
        wx.showModal({
          title: '注意了',
          content: '没那么多库存了',
          showCancel: false
        })
      }
    },
    onLess(){
      if (this.properties.num===0){
        return
      }
      this.setData({
        num: this.properties.num-1
      })
      this.triggerEvent('less', this.properties.num)
    }
  }
})
