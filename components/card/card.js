// components/card/card.js
Component({
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
  methods: {
    onGotUserInfo(event) {
      this.triggerEvent('gotUserInfo',event)
    }
  }
})
