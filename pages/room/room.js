// pages/room/room.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    build: '',
    unit: '',
    room: '',
    trueOrfalse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  verify(content){
    const reg = new RegExp(/^[0-9]*[1-9][0-9]*$/)
    return reg.test(content)
  },
  _showToast() {
    wx.showToast({
      title: '请输入数字',
      icon: 'none',
      duration: 2000
    })
    this.setData({
      trueOrfalse:false
    })
  },
  onSetBuild(val){
    let value = val.detail
    if (!this.verify(value)){
      this._showToast()
    }else{
      this.setData({
        build:value,
        trueOrfalse: true
      })
    }
  },
  onSetUnit(val){
    const value = val.detail
    if (!this.verify(value)){
      this._showToast()
    }else{
      this.setData({
        unit:value,
        trueOrfalse: true
      })
    }
  },
  onBSetRoom(val){
    const value = val.detail
    if (!this.verify(value)){
      this._showToast()
    }else{
      this.setData({
        room:value,
        trueOrfalse: true
      })
    }
  },
  onSubmit(){
    if(this.data.trueOrfalse){
      console.log('提交')
    }
  }
})