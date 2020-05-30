import { saveUserByRoom } from '../../api/user'
Page({
  data: {
    build: '',
    unit: '',
    room: '',
    trueOrfalse: false
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
      saveUserByRoom(this.data.build,this.data.unit,this.data.room).then(res=>{
        wx.navigateBack()
      })
    }
  }
})