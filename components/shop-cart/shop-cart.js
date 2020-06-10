Component({
  properties: {
    shopCart: {
      type: Array,
      observer () {
        this.initRestult(this.properties.shopCart)
      }
    }
  },
  data: {
    visable: false,
    result: []
  },
  observers: {
    'shopCart': function(){
      this.animate('.icon', [
        {scale: [1]},
        {scale: [1.2, 1.2]},
        {scale: [1,1]},
        ], 300, function () {
          this.clearAnimation('.icon')
      }.bind(this))
    }
  },
  methods: {
    initRestult (shopCart) {
      if (shopCart.length===0){
        return
      }
      this.setData({
        result: []
      })
      shopCart.forEach((shop)=>{
        let current = shop.id
        current = current.toString()
        this.setData({
          result: this.data.result.concat(current)
        })
      })
    },
    showCartList() {
      this.setData({
        visable: !this.data.visable
      })
    },
    onAdd(event) {
      const shop= event.detail
      this.triggerEvent('add', shop)
    },
    onLess(event){
      const shop= event.detail
      this.triggerEvent('less', shop)
    },
    onSubmit() {
      const result = this.data.result
      const shopCart = this.properties.shopCart
      if (result.length===0){
        return
      }
      const parseIntForResult = this.parsetIntForResult(result)
      let temp = []
      parseIntForResult.forEach((r)=>{
        for (let i in shopCart){
          let shop = shopCart[i]
          if (shop.id === r) {
            temp.push(shop)
          }
        }
      })
    },
    parsetIntForResult (result) {
      let temp=[]
      result.forEach((r)=>{
        temp.push(parseInt(r))
      })
      return temp
    },
    onClearShopCart () {
      this.triggerEvent('clearShopCart')
      this.showCartList()
    },
    onChangeCheckbox (event){
      this.setData({
        result: event.detail,
      });
    },
    onSelectAll (event) {
      let flag = event.detail
      if (flag) {
        this.initRestult(this.properties.shopCart)
      } else {
        this.setData({
          result: []
        })
      }
    },
    onClick () {
      this.triggerEvent('click')
    }
  }
})
