import { whiteComment }from '../../api/comment'
Page({
  data: {
    star: 5,
    comment: '',
    gid: 0
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('writeComment', (res) => {
      this.setData({
        gid: res
      })
    })
  },
  onRate(event){
    const star = event.detail
    this.setData({
      star
    })
  },
  onWriteComment(event){
    const comment = event.detail
    this.setData({
      comment
    })
  },
  onSave(){
    whiteComment(this.data.gid,this.data.star,this.data.comment).then(res=>{
      wx.navigateBack()
    })
  }
})