import { addGood } from '../../api/good'
Page({
  data: {
    columns: null,
    subs: null,
    name: '',
    goodType: '',
    specification: '',
    detail: '',
    sid: 0,
    cid: 0,
    show: false
  },
  onReady() {
    let subs = wx.getStorageSync('subs')
    this.setData({
      subs: subs,
      columns: [{
        values: Object.keys(subs),
        className: 'column1'
      },
      {
        values: subs['生活'],
        className: 'column2'
      }]
    })
  },
  // 弹出层控制
  onShowSelect() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSetName(e) {
    this.setData({
      name: e.detail
    })
  },
  onSetSpecification(e) {
    this.setData({
      specification: e.detail
    })
  },
  onSetDetail(e) {
    this.setData({
      detail: e.detail
    })
  },
  // 选择器
  getSelectValue(event) {
    console.log(event.detail)
  },
  onChangeType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, this.data.subs[value[0]])
  },
  onSelectType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    let sid = value[1].index
    let content = value[0]
    let subName = value[1].values
    let cid = this.findCid(content)
    this.setData({
      goodType: subName,
      sid,
      cid
    })
    this.onClose()
  },
  findCid(contentName) {
    let all = wx.getStorageSync('content')
    let cid = 0
    all.forEach((item)=>{
      if(item.name==contentName){
        cid = item.id
      }
    })
    return cid
  },
  // 提交
  onSave() {
    if (this.data.name && this.data.specification) {
      addGood(this.data.sid,this.data.cid,this.data.name,this.data.specification,this.data.detail).then(res=>{
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack()
      })
    } else {
      wx.showToast({
        title: '请填写好内容',
      })
    }
  }
})