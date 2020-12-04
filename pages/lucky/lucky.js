/*
  1、传入进来的prize数组要么是6和8
  2、中奖率 winning 一共加起来为1
  3、日后考虑增加更多的样式
*/

import {
  sentMyLucky,
  getMyLucky
} from '../../api/user'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({
  data: {
    prize: [{
        'name': '1分',
        'winnning': 0.2,
        'count': 1
      },
      {
        'name': '谢谢参与',
        'winnning': 0.5,
        'count': 0
      }, {
        'name': '5分',
        'winnning': 0.05,
        'count': 5
      }, {
        'name': '7分',
        'winnning': 0.05,
        'count': 7
      }, 
      {
        'name': '3分',
        'winnning': 0.1,
        'count': 3
      }, 
      {
        'name': '4分',
        'winnning': 0.1,
        'count': 4
      }
    ],
    chance: 0
  },
  onShow: function (options) {
    this._getMyLucky()
  },
  _getMyLucky() {
    getMyLucky().then(res => {
      let chance = res.lucky
      this.setData({
        chance
      })
    })
  },
  _sendLucky(e) {
    let prize = e.detail.count
    let message = prize > 0 ? `恭喜你抽中了${prize}分`: '非常遗憾，你没抽中'
    Dialog.alert({
      message: message,
      theme: 'round-button',
    }).then(() => {
      this.selectComponent('#myTurnTable').onClear()
    }).then(() => {
      sentMyLucky(prize).then(res => {
        this._getMyLucky()
      })
    })
  },
  // 没有抽奖机会
  onNoneChance () {
    Dialog.alert({
      message: '您已经没有抽奖机会',
      theme: 'round-button',
    })
  }
})