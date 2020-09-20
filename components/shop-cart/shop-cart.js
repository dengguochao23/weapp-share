Component({
  properties: {
    shopCart: {
      type: Array,
      observer () {
        this.initRestult(this.properties.shopCart)
        this.onAnimationList()
      }
    },
    count: {
      type: Number
    }
  },
  data: {
    visable: false,
    result: [],
    allSelect: true,
    listHeight: 0
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
    },
    'visable': function () {
      this.createSelectorQuery().select('.listwrapper').boundingClientRect((res)=>{
        this.setData({
          listHeight: res.height
        })
      }).exec()
      this.onAnimationShopList()
    }
  },
  methods: {
    initRestult (shopCart) {
      if (shopCart.length===0){
        this.setData({
          allSelect: true
        })
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
    // 增减
    onAdd(event) {
      const shop= event.currentTarget.dataset.shop
      this.triggerEvent('add', shop)
    },
    onLess(event){
      const shop= event.currentTarget.dataset.shop
      this.triggerEvent('less', shop)
    },
    // 提交
    onSubmit() {
      // 处理提交的物品
      const result = this.data.result
      const shopCart = this.properties.shopCart
      if (result.length===0 || shopCart.length === 0){
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
      console.log(temp)
      this.triggerEvent('submit', temp)
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
    },
    onChangeCheckbox (event){
      let current = event.detail
      let flag;
      if (current.length < this.data.result.length) {
        flag = false
      }
      if (current.length === this.properties.shopCart.length) {
        flag = true
      }
      this.setData({
        allSelect: flag === undefined ? false: flag,
        result: current
      })
    },
    onSelectAll (event) {
      this.setData({
        allSelect: !!event.detail
      })
      if (this.data.allSelect) {
        this.initRestult(this.properties.shopCart)
      } else {
        this.setData({
          result: []
        })
      }
    },
    // 动画
    // 列表展示的动画
    onAnimationShopList () {
      if (this.data.visable === true) {
        setTimeout(()=>{
          const listHeight = this.data.listHeight
          this.animate('.listwrapper', [
            {translateY: 0},
            { translateY: -listHeight }
          ], 300, function () {
          }.bind(this))
        }, 50)
      } else {
        setTimeout(()=>{
          const listHeight = this.data.listHeight
          this.animate('.listwrapper', [
            { translateY: -listHeight },
            {translateY: 0}
          ], 300, function () {
            this.clearAnimation('.listwrapper', function () {
            })
          }.bind(this))
        }, 50)
      }
    },
    // 列表里面元素增减的列表动画
    onAnimationList() {
      this.createSelectorQuery().select('.listwrapper').boundingClientRect((res)=>{
        if (res === null) {
          return
        }
        setTimeout(()=>{
          let currentHeight = res.height
          let listHeight = this.data.listHeight
          if (currentHeight<this.data.listHeight) {
            this.animate('.listwrapper', [
              { translateY: -listHeight },
              {translateY: -currentHeight}
            ], 300, function () {
              this.setData({
                listHeight: currentHeight
              })
            }.bind(this))
          }
        },10)
    }).exec()
    }
  }
})
