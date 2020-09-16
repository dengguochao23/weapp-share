const STATUS_STOP = 'stop'
const STATUS_RUNNING = 'running'
const INTERVAL = true
class Particle{
  constructor(ctx,width,height,options){
    this._timer = null
    this.options = options || {}
    this.ctx = ctx
    this.width = width
    this.height = height
    this.status = STATUS_STOP
    this.interval = INTERVAL
    this.particles = []
    // 这是用作物品的移动
    this.step=0
    this._init()
  }
  _init(){
  }
  _draw() {
  }
  run(){
    if (this.status !== STATUS_RUNNING && this.interval===true){
      this.status = STATUS_RUNNING
      this._timer = setInterval(()=>{
        this._draw()
      }, 30)
    }
    if (this.status !== STATUS_RUNNING&&this.interval!==true){
      this.status = STATUS_RUNNING
      this._draw()
    }
    return this
  }
  stop(){
    this.status = STATUS_STOP
    clearInterval(this._timer)
    return this
  }
}
class Rain extends Particle {
  // 初始化雨点
  _init(){
    let width = this.width
    let height = this.height
    // 雨点的数量
    let amount = this.options.amount || 100
    // 雨点的速度
    let speedFactor = this.options.speedFactor || 0.03
    let speed = height * speedFactor
    let ps = this.particles
    for (let i=0;i<amount;i++){
      let p = {
        x: width,
        y: height,
        l: 2*Math.random(),
        xs: -1,
        ys: 10*Math.random() + speed,
        color: 'rgba(255, 255, 255, 0.5)'
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw(){
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0 , this.width,this.height)
    for(let i =0;i<ps.length;i++){
      let s = ps[i]
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x+s.l*s.xs, s.y+s.l*s.ys)
      ctx.strokeStyle=s.color
      ctx.stroke()
    }
    return this._update()
  }
  _update() {
    let {width, height, particles} = this
    let ps = particles
    for (let i=0;i<ps.length;i++){
      let s = ps[i]
      s.x += s.xs
      s.y += s.ys
      if (s.x> width|| s.y>height){
        s.x = Math.random()*width
        s.y = -5
      }
    }
  }
}

class Star extends Particle{
  _init(){
    // this.interval = false
    let width = this.width
    let height = this.height / 2
    // 星星的数量
    let amount = this.options.amount || 100
    let ps = this.particles
    for (let i=0;i<amount;i++){
      let p = {
        x: Math.random()*width,
        y: Math.random()*height,
        r: Math.random()*3,
        // 开始
        sangle: 0,
        // 结束
        eangle: 2*Math.PI,
        color: 'rgba(255, 255, 255, 1)'
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw(){
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0 , this.width,this.height)
    for(let i =0;i<ps.length;i++){
      let s = ps[i]
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r,s.sangle, s.eangle)
      ctx.fillStyle=s.color
      ctx.fill()
    }
  }
}

class Sunny extends Particle{
  _init(){
    this.interval = false
    let width = this.width
    // 星星的数量
    let amount = 6
    let ps = this.particles
    for (let i=0;i<amount;i++){
      let p = ''
      if (i===1 ) {
       p = {
          x: width,
          y: 0,
          r: 70,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(250,250,210)'
        }
      }
      if (i===0){
        p = {
          x: width,
          y: 0,
          r: 150,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(255, 255, 255, 0.4)'
        }
      }
      if (i===2) {
        p={
          x: width-130,
          y: 130,
          r: 5,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(255, 255, 255, 0.4)'
        }
      }
      if (i===3) {
        p={
          x: width-160,
          y: 160,
          r: 10,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(255, 255, 255, 0.6)'
        }
      }
      if (i===4) {
        p={
          x: width-175,
          y: 175,
          r: 20,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
      if (i===5) {
        p={
          x: width-190,
          y: 190,
          r: 40,
          sangle: 0,
          // 结束
          eangle: 2*Math.PI,
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    ps.push(p)
    }
    this.particles = ps
  }
  _draw(){
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0 , this.width,this.height)
    for(let i =0;i<ps.length;i++){
      ctx.beginPath()
      if(i===0){
        let s = ps[i]
        const grd = ctx.createLinearGradient(this.width, 0, this.width-150, 150)
        grd.addColorStop(0, 'white')
        grd.addColorStop(1, '#76C2F9')
        ctx.fillStyle = grd
        ctx.arc(s.x, s.y, s.r,s.sangle, s.eangle)
        ctx.fill()
      }else{
        let s = ps[i]
        ctx.arc(s.x, s.y, s.r,s.sangle, s.eangle)
        ctx.fillStyle=s.color
        ctx.fill()
      }
    }
  }
}

class Cloud extends Particle{
  _init(){
    let width = this.width
    let height = this.height
    let cloudWidth = this.width*0.25
    // 星星的数量
    let amount = this.options.amount || 1
    let ps = this.particles
    for (let i=0;i<amount;i++){
      let p = {
        x: Math.random()*width,
        y: height*Math.random()*0.5,
        cw: cloudWidth,
        // 云朵的高度
        ch: cloudWidth*0.6,
        // 开始
        sangle: 0,
        // 结束
        eangle: 2*Math.PI,
        color: 'rgba(255, 255, 255, 0.5)'
      }
      ps.push(p)
    }
    this.particles = ps
  }
  _draw(){
    this.step+=Math.random()
    let ps = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0 , this.width,this.height)
    for(let i =0;i<ps.length;i++){
      let s = ps[i]
      let cx = (s.x+this.step)%this.width
      ctx.beginPath()
      ctx.fill();
      ctx.arc(cx,s.y,s.cw*0.19,s.sangle,s.eangle)
      ctx.arc(cx + s.cw * 0.08, s.y - s.ch * 0.3, s.cw * 0.11, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.3, s.y - s.ch * 0.25, s.cw * 0.25, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.6, s.y, 80 * 0.21, s.sangle, s.eangle);
      ctx.arc(cx + s.cw * 0.3, s.y - s.ch * 0.1, s.cw * 0.28, s.sangle, s.eangle);
      ctx.closePath();
      ctx.fillStyle=s.color
      ctx.fill();
    }
  }
}

class Smog extends Particle{
  _init(){
    // this.interval = false
    let width = this.width
    let height = this.height
    this.particles = {
      x: width,
      y: height,
      color: 'rgba(166, 166, 166, 0.4)'
  }
  }
  _draw(){
    this.interval = false
    let p = this.particles
    let ctx = this.ctx
    // 首先清除画布上的内容
    ctx.clearRect(0, 0 , this.width,this.height)
    ctx.rect(0,0,p.x,p.y)
    ctx.fillStyle=p.color
    ctx.fill()
  }
}

export {
  Rain,
  Star,
  Cloud,
  Sunny,
  Smog
}