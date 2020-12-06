import {
  searchGoods
} from '../../api/search'
import {
  createGoods
} from '../../models/good'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import{ normallArray} from '../../util/normal'
const normalGood = normallArray(createGoods)
const app = getApp()
Page({
  data: {
    value: '',
    goods: [],
    page: 1, //当前的第几页
    pages: 10,
    total: 10
  },
  onShow: function () {
    this.setData({
      goods: [],
      page: 1
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  // search组件
  onSearch() {
    this.setData({
      goods: []
    })
    this._searchGoods()
  },
  onClean() {
    this.setData({
      goods: []
    })
  },
  // 搜索处理
  _searchGoods() {
    searchGoods(this.data.value, this.data.page).then(res => {
      if (res.data.length == 0) {
        Toast('没有搜索到相关内容');
        return
      } else {
        let good = normalGood(res.data)
        let goods = this.data.goods
        goods = goods.concat(good)
        this.setData({
          total: res.total,
          page: res.page,
          pages: res.pages,
          goods: goods
        })
      }
    })
  },
  onPullUp() {
    this.setData({
      page: this.data.page + 1
    })
    if (this.data.pages >= this.data.page) {
      this._searchGoods()
    }
  },
  // 选择
  onSelectGood(e) {
    let gid = e.currentTarget.dataset.gid
    app.navigateTo({
      url: '/pages/help-detail/help-detail',
      events: {},
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('selectGood', gid)
      }
    })
  }
})