import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let anim
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#ffffff', '#f0d8bd', '#c59b6d', '#e1c6cd', '#faf5f7']

    class P {
      constructor() { this.reset(true) }
      reset(init = false) {
        this.x = Math.random() * canvas.width
        this.y = init ? Math.random() * canvas.height : canvas.height + 10
        this.r = 0.8 + Math.random() * 2.2
        this.vy = -(0.2 + Math.random() * 0.5)
        this.vx = (Math.random() - 0.5) * 0.3
        this.op = 0.4 + Math.random() * 0.6
        this.fade = 0.002 + Math.random() * 0.005
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.op -= this.fade
        if (this.op <= 0 || this.y < -10) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.op
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color; ctx.shadowBlur = 6
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 70; i++) particles.push(new P())

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      anim = requestAnimationFrame(loop)
    }
    loop()

    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas id="particleCanvas" ref={canvasRef} />
}
