import {
  getMyHelp,handleWish
} from "../../api/help"
import {
  createWishes
} from "../../models/wish"
import { normallArray} from '../../util/normal'
const normalWishes = normallArray(createWishes)
Page({
  data: {
    wishes: [],
    page: 1, //当前的第几页
    pages: 10,
    total: 10
  },
  onShow: function () {
    this.setData({
      wishes: []
    })
    this._getMyWish(1)
  },
  // 调转路由
  onAddWish() {
    wx.navigateTo({
      url: '/pages/addWish/addWish',
    })
  },
  //处理wish
  _getMyWish(page) {
    getMyHelp(page).then(res => {
      let wish = normalWishes(res.data)
      let wishes = this.data.wishes
      wishes = wishes.concat(wish)
      this.setData({
        total: res.total,
        page: res.page,
        pages: res.pages,
        wishes: wishes
      })
    })
  },
  // 开始下拉刷新
  onPullUp(){
    let page = this.data.page+1
    if (this.data.pages > this.data.page){
      this._getMyWish(page)
    }
  },
   // 撤销
   onCancel(e){
    const id = e.currentTarget.dataset.id
    const _this = this
    wx.showModal({
      title: '提示',
      content: '撤回你的求助',
      confirmColor: '#1c92d2',
      success(res){
        if (res.confirm){
          handleWish(id,10).then((res)=>{
            _this.setData({
              wishes: []
            })
            _this._getMyWish(1)
          })
        }
      }
    })
  },
  // 生效
  onConfirm(e){
    const id = e.currentTarget.dataset.id
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定提交你的求助',
      confirmColor: '#1c92d2',
      success(res){
        if (res.confirm){
          handleWish(id,11).then((res)=>{
            _this.setData({
              wishes: []
            })
            _this._getMyWish(1)
          })
        }
      }
    })
  }
})