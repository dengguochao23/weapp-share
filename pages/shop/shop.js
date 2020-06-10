import { getAllShop } from '../../api/shop'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({
  data: {
    shops: '',
    shopCart: [],
    // 用来存储checkbox里面的物品的名称
    result: []
  },
  onLoad: function (options) {
    this._getALLShop(1)
  },
  _getALLShop (type) {
    getAllShop (type).then(res=>{
      let data = res
      getAllShop(2).then(res=>{
        data = data.concat(res)
        this.setData({
          shops: data
        })
      })
    })
  },
  addShop (event) {
    let shop = {
      'id': event.detail.id,
      'name': event.detail.name,
      'price': event.detail.price,
      'num': 1
    }
    let cart = this.data.shopCart
    let sameofshopforIndex = cart.findIndex((s)=>{
      return s.id === shop.id
    })
    if (sameofshopforIndex>=0){
      let current = cart[sameofshopforIndex]
      let num = current.num+1
      current.num = num
    }else{
      cart.push(shop)
    }
    this.setData({
      shopCart: cart
    })
  },
  lessShop (event) {
    let shop = event.detail
    let cart = this.data.shopCart
    let sameofshopforIndex = cart.findIndex((s)=>{
      return s.id === shop.id
    })
    let current = cart[sameofshopforIndex]
    let num = current.num-1
    current.num = num
    if (num<1){
      cart.splice(sameofshopforIndex, 1)
    }
    this.setData({
      shopCart: cart
    })
  },
  onClearShopCart () {
    Dialog.confirm({
      title: '注意',
      message: '你确定要清空你的购物车吗？',
    }).then(() => {
      this.setData({
        shopCart: []
      })
    })
  },
  onClick () {
    
  }
})