Component({
  properties: {
    prize: {
      type: Array
    },
    chance: {
      type: Number
    }
  },
  data: {
    onRotation: false,
    reward: 0
  },
  methods: {
    getRange(winning) {
      let temp = []
      winning.forEach((item, index) => {
        if (index === 0) {
          temp.push(item['winnning'] * 360)
        } else {
          temp.push(parseInt(temp.slice(-1)) + item['winnning'] * 360)
        }
      })
      return temp
    },
    getReward() {
      // 求出中奖范围
      let winningRange = this.getRange(this.properties.prize)
      // 抽到的随记数
      let random = Math.round(Math.random() * 360)
      // 判断是否中奖
      for (let i in winningRange) {
        let currentwinning = winningRange[i] // 当前取值
        if (random < currentwinning) {
          this.setData({
            reward: i
          })
          break
        } else {
          if (i == 0) {
            continue
          }
          if (random >= winningRange[i - 1] && random <= currentwinning) {
            this.setData({
              reward: i
            })
            break
          }
        }
      }
    },
    onPoint() {
      // 平均值
      const averageRotate = 360 / this.properties.prize.length
      // 是否有抽奖机会
      if (this.properties.chance === 0) {
        this.triggerEvent('none')
        return
      }
      // 防止转动时点击开始按钮
      if (!this.data.onRotation) {
        this.setData({
          onRotation: true
        })
        this.getReward()
        let deg = this.data.reward * averageRotate + 3 * 360  // 至少3圈以上
        this.animate('.wrapper', [{
            rotate: 0,
            ease: 'ease-in-out'
          },
          {
            rotate: deg,
            ease: 'ease-in-out'
          }
        ], 5000, function () {
          this.setData({
            onRotation: false
          })
          // 发送自己的抽奖信息
          this.triggerEvent('onResult', this.properties.prize[this.data.reward])
        }.bind(this))
      }
    },
    // 让动画重置
    onClear(){
      this.clearAnimation('.wrapper')
    }
  }
})