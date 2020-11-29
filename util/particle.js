const STATUS_STOP = 'stop'
const STATUS_RUNNING = 'running'
const INTERVAL = true
class Particle {
  constructor(ctx, width, height, options) {
    this._timer = null
    this.options = options || {}
    this.ctx = ctx
    this.width = width
    this.height = height
    this.status = STATUS_STOP
    this.interval = INTERVAL
    this.particles = []
    // 这是用作物品的移动
    this.step = 0
    this._init()
  }
  _init() {}
  _draw() {}
  run() {
    if (this.status !== STATUS_RUNNING) {
      if (this.interval === true) {
        this._timer = setInterval(() => {
          this._draw()
        }, 30)
      } else {
        this._draw()
      }
      this.status = STATUS_RUNNING
    }
    return this
  }
  stop() {
    this.status = STATUS_STOP
    clearInterval(this._timer)
    return this
  }
}
class Rain extends Particle {
  // 初始化雨点
  _init() {
    let width = this.width
    let height = this.height
    // 雨点的数量
    let amount = this.options.amount || 100
    // 雨点的速度
    let speedFactor = this.options.speedFactor || 0.03
    let speed = height * speedFactor
    let ps = this.particles
    for (let i = 0; i < amount; i++) {
      let p = {
        x: width,
        y: height,
        l: 2 * Math.random(),
        xs: -1,
        ys: 10 * Math.random() + speed,
        color: 'rgba(255, 255, 255, 0.5)'
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw() {
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x + s.l * s.xs, s.y + s.l * s.ys)
      ctx.strokeStyle = s.color
      ctx.stroke()
    }
    return this._update()
  }
  _update() {
    let {
      width,
      height,
      particles
    } = this
    let ps = particles
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      s.x += s.xs
      s.y += s.ys
      if (s.x > width || s.y > height) {
        s.x = Math.random() * width
        s.y = -5
      }
    }
  }
}

class Snow extends Particle {
  // 初始化雪点
  _init() {
    let width = this.width
    let height = this.height
    let speed = this.options.speed || 5
    // 雪点的数量
    let amount = this.options.amount || 100
    let ps = this.particles
    for (let i = 0; i < amount; i++) {
      let p = {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2,
        // 开始
        sangle: 0,
        // 结束
        eangle: 2 * Math.PI,
        color: 'rgba(255, 255, 255, 1)',
        // 雪下降的速度
        ys: speed
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw() {
    let ps = this.particles
    let ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, s.sangle, s.eangle)
      ctx.fillStyle = s.color
      ctx.fill()
    }
    return this._update()
  }
  _update() {
    let {
      height,
      particles
    } = this
    let ps = particles
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i]
      p.color = `rgba(255, 255, 255, ${1 - p.y/height})`
      p.y += p.ys
      if (p.y > height) {
        p.y = 0
        p.color = 'rgba(255, 255, 255, 1)'
      }
    }
  }
}

class Star extends Particle {
  _init() {
    let width = this.width
    let height = this.height / 2
    // 星星的数量
    let amount = this.options.amount || 100
    let ps = this.particles
    let p = {}
    let speed = this.options.speed || 2
    for (let i = 0; i < amount; i++) {
      if (i === Math.round(amount / 2)) {
        p = {
          x: width - 50,
          y: 50,
          r: 4,
          // 开始
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          color: 'rgba(255, 255, 255, 1)',
          // 用来判断是否是流星
          star: true,
          speed: speed
        }
      } else {
        p = {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 3,
          sangle: 0,
          eangle: 2 * Math.PI,
          color: 'rgba(255, 255, 255, 1)',
          star: false
        }
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw() {
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, s.sangle, s.eangle)
      ctx.fillStyle = s.color
      ctx.fill()
    }
    return this._update()
  }
  _update() {
    let {
      width,
      particles
    } = this
    let ps = particles
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      if (s.star) {
        s.x -= s.speed
        s.y += s.speed
        s.color = `rgba(255,255,255, ${(s.x-50)/(width-50)})`
        if (s.x < 50) {
          this.stop()
        }
      }
    }
  }
}

class Sunny extends Particle {
  _init() {
    this.interval = true
    let width = this.width
    // 星星的数量
    let amount = 6
    let ps = this.particles
    for (let i = 0; i < amount; i++) {
      let p = ''
      if (i === 5) {
        p = {
          x: width,
          y: 0,
          r: 70,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI
          // color: 'rgba(250,250,210)'
        }
      }
      if (i === 4) {
        p = {
          x: width,
          y: 0,
          r: 130,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          color: 'rgba(255, 255, 255, 0.4)'
        }
      }
      if (i === 0) {
        p = {
          x: width,
          y: 0,
          r: 5,
          // 停顿距离
          tx: width - 130,
          ty: 130,
          // 移动速度
          speed: 130 / 60,
          // 是否是上半阶段
          half: true,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          // 透明度
          opacity: 0.4,
          to: 0.4,
          opacitySpeed: 0.4 / 60
        }
      }
      if (i === 1) {
        p = {
          x: width,
          y: 0,
          r: 10,
          tx: width - 160,
          ty: 160,
          speed: 160 / 60,
          // 是否是上半阶段
          half: true,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          opacity: 0.6,
          to: 0.6,
          opacitySpeed: 0.6 / 60
        }
      }
      if (i === 2) {
        p = {
          x: width,
          y: 0,
          r: 20,
          tx: width - 175,
          ty: 175,
          speed: 175 / 60,
          // 是否是上半阶段
          half: true,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          opacity: 0.3,
          to: 0.3,
          opacitySpeed: 0.3 / 60
        }
      }
      if (i === 3) {
        p = {
          x: width,
          y: 0,
          r: 40,
          tx: width - 190,
          ty: 190,
          speed: 190 / 60,
          // 是否是上半阶段
          half: true,
          sangle: 0,
          // 结束
          eangle: 2 * Math.PI,
          opacity: 0.2,
          to: 0.2,
          opacitySpeed: 0.2 / 60
        }
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw() {
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0; i < ps.length; i++) {
      ctx.beginPath()
      if (i === 4) {
        let s = ps[i]
        const grd = ctx.createLinearGradient(this.width, 0, this.width - 150, 150)
        grd.addColorStop(0, 'rgba(255,255, 255, 0.7)')
        grd.addColorStop(0, 'rgba(255,255, 255, 0.3)')
        ctx.fillStyle = grd
        ctx.arc(s.x, s.y, s.r, s.sangle, s.eangle)
        ctx.fill()
      } else {
        let s = ps[i]
        let color = i === 5? 'rgba(250,250,250)' : `rgba(255, 255, 255, ${s.to})`
        ctx.arc(s.x, s.y, s.r, s.sangle, s.eangle)
        ctx.fillStyle = color
        ctx.fill()
      }
    }
    return this._update()
  }
  _update() {
    let {
      particles,
      width
    } = this
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i]
      if (i < 4) {
        if (p.half){
          if (p.x < p.tx) {
            p.x = p.x
            p.y = p.y
            p.speed = p.x / 60
            p.half = false
            this.stop()
            setTimeout (()=>{
              this.run()
            }, 2000)
          } else {
            p.x -= p.speed
            p.y += p.speed
          }
        } else {
          if (p.x < 0) {
            p.x = width
            p.y = 0
            p.speed = p.ty / 60
            p.half = true
            p.to = p.opacity
          } else {
            p.x -= p.speed
            p.y += p.speed
            p.to -= p.opacitySpeed
          }
        }
      }
    }
  }
}

class Cloud extends Particle {
  _init() {
    let width = this.width
    let height = this.height
    let cloudWidth = this.width * 0.25
    // 云朵的数量
    let amount = this.options.amount || 1
    let ps = this.particles
    for (let i = 0; i < amount; i++) {
      let p = {
        x: Math.random() * width,
        y: height * Math.random() * 0.5,
        cw: cloudWidth,
        // 云朵的高度
        ch: cloudWidth * 0.6,
        // 开始
        sangle: 0,
        // 结束
        eangle: 2 * Math.PI,
        color: 'rgba(255, 255, 255, 0.5)'
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw() {
    this.step += Math.random()
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0, this.width, this.height)
    for (let i = 0; i < ps.length; i++) {
      let s = ps[i]
      let cx = (s.x + this.step) % this.width
      ctx.beginPath()
      ctx.fill();
      ctx.arc(cx, s.y, s.cw * 0.19, s.sangle, s.eangle)
      ctx.arc(cx + s.cw * 0.08, s.y - s.ch * 0.3, s.cw * 0.11, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.3, s.y - s.ch * 0.25, s.cw * 0.25, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.6, s.y, 80 * 0.21, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.3, s.y - s.ch * 0.1, s.cw * 0.28, s.sangle, s.eangle);
      ctx.closePath();
      ctx.fillStyle = s.color
      ctx.fill();
    }
  }
}
class Smog extends Particle {
  _init() {
    let width = this.width
    let height = this.height
    this.particles = {
      x: width,
      y: height,
      total: 0.6
    }
  }
  _draw() {
    let p = this.particles
    let ctx = this.ctx
    this.step += 0.003
    let color = `rgba(166,166,166, ${this.step})`
    // 首先清除画布上的内容
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.rect(0, 0, p.x, p.y)
    ctx.fillStyle = color
    ctx.fill()
    if (this.step >= p.total) {
      this.stop()
    }
  }
}

export {
  Rain,
  Star,
  Cloud,
  Sunny,
  Smog,
  Snow
}