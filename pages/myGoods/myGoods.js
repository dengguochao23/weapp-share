// pages/myGoods/myGoods.js
import { getMyGood,handleGood } from '../../api/good'
import { createGoods } from '../../models/good'
import { normallArray } from '../../util/normal'
const normalGoods = normallArray(createGoods)
Page({
  data: {
    goods: [],
    page: 1, //当前的第几页
    pages: 1,
    total: 1
  },
  onShow: function () {
    this.setData({
      goods: []
    })
    this._getMyGoods(1)
  },
  // 路由
  onAddGood () {
    wx.navigateTo({
      url: '/pages/addGood/addGood'
    })
  },
  _getMyGoods (page) {
    getMyGood(page).then(res=>{
      let good = normalGoods(res.data)
      let goods = this.data.goods
      goods = goods.concat(good)
      this.setData({
        total: res.total,
        page: res.page,
        pages: res.pages,
        goods: goods
      })
    })
  },
  // 开始下拉刷新
  onPullUp(){
    let page = this.data.page+1
    if (this.data.pages > this.data.page){
      this._getMyGoods(page)
    }
  },
  // 撤销
  onCancel(e){
    const gid = e.currentTarget.dataset.gid
    const _this = this
    wx.showModal({
      title: '提示',
      content: '撤回你的货品',
      confirmColor: '#1c92d2',
      success(res){
        if (res.confirm){
          handleGood(gid,10).then((res)=>{
            _this.setData({
              goods: []
            })
            _this._getMyGoods(1)
          })
        }
      }
    })
  },
  // 生效
  onConfirm(e){
    const gid = e.currentTarget.dataset.gid
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定提交你的物品',
      confirmColor: '#1c92d2',
      success(res){
        if (res.confirm){
          handleGood(gid,11).then((res)=>{
            _this.setData({
              goods: []
            })
            _this._getMyGoods(1)
          })
        }
      }
    })
  }
})