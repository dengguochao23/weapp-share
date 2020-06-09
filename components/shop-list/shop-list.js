Component({
  properties: {
    visable: {
      type: Boolean,
      observer () {
        this.createSelectorQuery().select('.list').boundingClientRect((res)=>{
            this.setData({
              listHeight: res.height
            })
        }).exec()
        this.onAnimation()
      }
    },
    shopCart: {
      type: Array,
      observer () {
        this.createSelectorQuery().select('.list').boundingClientRect((res)=>{
          if (res === null) {
            return
          }
          setTimeout(()=>{
            let currentHeight = res.height
            let listHeight = this.data.listHeight
            if (currentHeight<this.data.listHeight) {
              this.animate('.list', [
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
    },
    result: {
      type: Array
    }
  },
  data: {
    allSelect: true,
    listHeight: 0,
    isShowList: false
  },
  methods: {
    onChangeCheckbox(event) {
      this.triggerEvent('changeCheckBox', event.detail)
    },
    onSelectAll(event){
      this.setData({
        allSelect: !!event.detail
      })
      this.triggerEvent('selectAll', this.data.allSelect)
    },
    clearShopCart () {
      this.triggerEvent('clearShopCart')
    },
    onAnimation () {
      if (this.properties.visable === true) {
        this.setData({
          isShowList: this.properties.visable
        })
        setTimeout(()=>{
          const listHeight = this.data.listHeight
          this.animate('.list', [
            {translateY: 0},
            { translateY: -listHeight }
          ], 300, function () {
          }.bind(this))
        }, 50)
      } else {
        setTimeout(()=>{
          const listHeight = this.data.listHeight
          this.animate('.list', [
            { translateY: -listHeight },
            {translateY: 0}
          ], 300, function () {
            this.setData({
              isShowList: this.properties.visable
            })
            this.clearAnimation('.list', function () {
              console.log("清除了.block上的所有动画属性")
            })
          }.bind(this))
        }, 50)
      }
    },
    onAdd(event) {
      const shop= event.currentTarget.dataset.shop
      this.triggerEvent('add', shop)
    },
    onLess(event){
      const shop= event.currentTarget.dataset.shop
      this.triggerEvent('less', shop)
    }
  }
})
