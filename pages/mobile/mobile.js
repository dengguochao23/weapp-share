import { saveUserByMobile } from '../../api/user'
Page({
  data: {
    mobile:''
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendMobile',(res)=>{
      this.setData({
        mobile:res
      })
    })
  },
  verify(content){
    const reg = new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/)
    return reg.test(content)
  },
  _showToast() {
    wx.showToast({
      title: '请输入正确的11位手机号码',
      icon: 'none',
      duration: 2000
    })
  },
  onConfirm (val) {
    let value = val.detail
    if (this.verify(value)){
      this.setData({
        mobile:value
      })
      this.onSubmit()
    }else{
      this._showToast()
    }
  },
  onBlur (val) {
    let value = val.detail
    if (!this.verify(value)){
      this._showToast()
    }
    this.setData({
      mobile:value
    })
  },
  onSubmit(){
    const mobile = this.data.mobile
    if (this.verify(mobile)){
      saveUserByMobile(mobile).then(res=>{
        wx.navigateBack()
      })
    }
  }
})