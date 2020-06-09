import { getAllShop } from '../../api/shop'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: '',
    shopCart: [],
    // 用来存储checkbox里面的物品的名称
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getALLShop(1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    document.body.clientHeight
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
    this.setData({
      shopCart: []
    })
  }
})