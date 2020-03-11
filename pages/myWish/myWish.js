import { getMyHelp }from "../../api/help"
import {createWishes} from "../../models/wish"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wishes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyWish()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 调转路由
  onAddWish () {
    wx.navigateTo({
      url: '/pages/addWish/addWish',
    })
  },
  //处理wish
  _getMyWish(){
    getMyHelp().then(res=>{
      this.setData({
        wishes: this.normalWishes(res)
      })
    })
  },
  normalWishes(data) {
    let temp = []
    data.forEach((item)=>{
      temp.push(createWishes(item))
    })
    return temp
  },
})