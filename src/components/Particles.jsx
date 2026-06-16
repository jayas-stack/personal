import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let anim
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Realistic NASA galaxy colors: pure white, bluish-white, faint blue, faint red dwarf, faint orange
    const COLORS = ['#ffffff', '#ffffff', '#e0f0ff', '#a3d1ff', '#ffcccc', '#ffd2a6']


    class Star {
      constructor() {
        this.reset(true)
      }
      reset(init = false) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        // z represents depth (0 to canvas.width)
        this.z = init ? Math.random() * canvas.width : canvas.width
        // Size inversely proportional to depth, smaller realistic stars
        this.baseRadius = 0.2 + Math.random() * 1.0
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      update() {
        // Slow, grand majestic movement for realistic space scale
        this.z -= 0.15
        if (this.z <= 0) {
          this.reset()
        }
      }
      draw() {
        // Calculate 3D to 2D projection
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        // Factor controls field of view
        const factor = canvas.width / this.z
        
        const px = (this.x - cx) * factor + cx
        const py = (this.y - cy) * factor + cy
        const r = this.baseRadius * factor

        // Don't draw if outside screen
        if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) return

        // Calculate opacity based on depth (fade in from distance)
        const opacity = Math.min(1, (canvas.width - this.z) / (canvas.width / 2))

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.fillStyle = this.color
        
        // Add subtle glow to closer stars
        if (this.z < canvas.width / 3) {
          ctx.shadowColor = this.color
          ctx.shadowBlur = 8
        }
        
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    class Comet {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width * 1.5
        this.y = -Math.random() * canvas.height
        this.length = 80 + Math.random() * 100
        this.vx = -(6 + Math.random() * 4) // Move left
        this.vy = 6 + Math.random() * 4    // Move down
        this.opacity = 0
        this.fade = 0.01 + Math.random() * 0.02
        this.active = false
        // Random delay before activating to space them out
        setTimeout(() => { this.active = true }, Math.random() * 6000 + 1000)
      }
      update() {
        if (!this.active) return
        this.x += this.vx
        this.y += this.vy
        
        // Fade in and out
        if (this.opacity < 1 && this.y < canvas.height / 2) {
          this.opacity += this.fade
        } else if (this.y > canvas.height / 2) {
          this.opacity -= this.fade
        }
        
        // Reset when out of bounds or faded out
        if (this.x < -this.length || this.y > canvas.height + this.length || this.opacity <= 0) {
          this.reset()
        }
      }
      draw() {
        if (!this.active || this.opacity <= 0) return
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.opacity)
        
        // Comet tail (gradient line)
        const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.vx * 15, this.y - this.vy * 15)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.vx * 15, this.y - this.vy * 15)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
        
        // Bright comet head
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 12
        ctx.shadowColor = '#ffffff'
        ctx.fill()
        
        ctx.restore()
      }
    }

    // Create 1000 stars for a majestic, dense realistic galaxy
    for (let i = 0; i < 1000; i++) {
      stars.push(new Star())
    }

    // Add 3 comets/shooting stars that occasionally streak across
    let comets = []
    for (let i = 0; i < 3; i++) {
      comets.push(new Comet())
    }

    const loop = () => {
      // Create slight trailing effect for premium look with pure space black
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(s => {
        s.update()
        s.draw()
      })

      comets.forEach(c => {
        c.update()
        c.draw()
      })

      anim = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="particleCanvas" ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}
