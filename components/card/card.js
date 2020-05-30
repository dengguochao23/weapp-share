// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nickname:{
      type: String,
      value: '暂时无名字'
    },
    logo: {
      type: String,
      value: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    room: {
      type: String,
      value: '空'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    img:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    room: '101-1-10502'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotUserInfo(event) {
      this.triggerEvent('gotUserInfo',event)
    }
  }
})
