// components/cart-control/cart-control.js
Component({
  properties: {
    num: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onAdd(){
      this.setData({
        num: this.properties.num+1
      })
      this.triggerEvent('add', this.properties.num)
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
