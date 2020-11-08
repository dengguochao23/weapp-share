// components/input/input.js
Component({
  properties: {
    placeholder:{
      type:String,
      value: '请输入内容'
    },
    title: {
      type: String,
      value: '文字'
    },
    type: {
      type: String,
      value: 'text'
    }
  },
  data: {
  },
  methods: {
    onBlur (event) {
      let value = event.detail.value
      this.triggerEvent('onBlur',value)
    },
    onConfirm(event){
      let value = event.detail.value
      this.triggerEvent('onConfirm',value)
    }
  }
})
