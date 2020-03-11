// pages/myGoods/myGoods.js
import { getMyGood } from '../../api/good'
import { createGoods } from '../../models/good'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: '',
    height: 88
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyGoods()
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
    this._getMyGoods()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getMyGoods () {
    getMyGood().then(res=>{
      this.setData({
        goods: this.normalGood(res)
      })
    })
  },
  normalGood(data){
    let t = []
    data.forEach((i)=>{
      t.push(createGoods(i))
    })
    return t
  },
  onAddGood () {
    wx.navigateTo({
      url: '/pages/addGood/addGood',
    })
  }
})