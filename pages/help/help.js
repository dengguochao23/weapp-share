const subs = wx.getStorageSync('subs')
import {
  getAllWish,
  getAllWishBySid,
  checkMyGood
} from '../../api/help'
import {createDriftFromSharer} from '../../api/drift'
import {
  createWishes
} from '../../models/wish'
import {
  createGoods
} from '../../models/good'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  data: {
    select: '全部',
    showType: false,
    showMyWish: false,
    columns: [{
        values: Object.keys(subs),
        className: 'column1'
      },
      {
        values: subs['生活'],
        className: 'column2'
      }
    ],
    sid: 0,
    page: 1,
    total: 1,
    goods: [],
    wishes: [],
    radio: '1',
    // 求助者UID
    wishUid: 0,
    wishId: 0,
    name: '',
    gid: '',
  },
  onLoad: function () {
    this._getAllWish(this.data.page)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  // pop展示控制
  showTypePopup() {
    this.setData({
      showType: true
    })
  },
  showMyWishPopup() {
    this.setData({
      showMyWish: true
    })
  },
  closePopup() {
    this.setData({
      showType: false,
      showMyWish: false
    })
  },
  // pickerd选择器
  onChangeType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, subs[value[0]])
  },
  onSelectType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    let sid = value[1].index
    let subName = value[1].values
    this.setData({
      select: subName,
      sid,
    })
    this._getAllWishBySid(sid, 1)
    this.closePopup()
  },
  // 获取数据
  _getAllWishBySid(sid, page) {
    this.setData({
      wishes: []
    })
    getAllWishBySid(sid, page).then(res => {
      let wishes = this.data.wishes.concat(this.noramlWish(res.data))
      this.setData({
        total: res.total,
        page: res.page,
        wishes: wishes
      })
    })
  },
  _getAllWish(page) {
    getAllWish(page).then(res => {
      let wishes = this.data.wishes.concat(this.noramlWish(res.data))
      this.setData({
        total: res.total,
        page: res.page,
        wishes: wishes
      })
    })
  },
  noramlWish(data) {
    let temp = []
    data.forEach((d) => {
      temp.push(createWishes(d))
    })
    return temp
  },
  normalGoods(data) {
    let temp = []
    data.forEach((d) => {
      temp.push(createGoods(d))
    })
    return temp
  },
  // 选择某个
  onSelectWish(event) {
    const {name, uid, wishid} = event.currentTarget.dataset
    this.setData({
      goods: [],
      wishUid: uid,
      wishId:wishid
    })
    checkMyGood(name).then(res => {
      const goods = this.data.goods.concat(this.normalGoods(res))
      this.setData({
        goods
      })
      this.showMyWishPopup()
    }).catch(e => {
      Toast.fail('没有相关货品');
    })
  },
  onChange(event) {
  },
  onRadio(event) {
    const {name, gid} = event.currentTarget.dataset
    this.setData({
      name,
      gid,
      radio: name
    });
  },
  // 提交
  onSendMyGood () {
    createDriftFromSharer(this.data.wishId,this.data.gid,this.data.name,this.data.wishUid,5).then(res=>{
      Toast.success('提交成功');
      this.closePopup()
    })
  }
})