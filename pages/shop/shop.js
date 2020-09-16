import { getAllShop, sellMyShop } from '../../api/shop'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { getUserDetail }from '../../api/user'
Page({
  data: {
    shops: '',
    // 7豆
    count: 0,
    shopCart: [],
    // 用来存储checkbox里面的物品的名称
    result: []
  },
  onLoad: function (options) {
    this._getALLShop(1)
    this._getUserDetail()
  },
  _getUserDetail () {
    getUserDetail().then(res=>{
      this.setData({
        count: res.count
      })
    })
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
  onSubmit(event){
    let shopCart = event.detail
    sellMyShop(shopCart).then(res=>{
      Toast.success('提交成功')
      this.setData({
        shopCart: []
      })
    }).catch((e)=>{
      Toast.fail('你不够7豆')
    })
  }
})