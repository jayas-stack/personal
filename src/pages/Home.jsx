import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Home.module.css'

const PHOTOS = [
  { src: '/photo_placeholder.png' },
  { src: '/photo_placeholder.png' },
  { src: '/photo_placeholder.png' },
  { src: '/photo_placeholder.png' },
  { src: '/photo_placeholder.png' },
]

export default function Home() {
  const [index, setIndex] = useState(0)

  // Auto-play slideshow background
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHOTOS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div className={`page ${styles.home}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>

      {/* Cinematic Slideshow Background */}
      <div className={styles.slideshowBg}>
        <AnimatePresence>
          <motion.img
            key={index}
            src={PHOTOS[index].src}
            className={styles.slideImage}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.45, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 2.5 }, scale: { duration: 12, ease: "linear" } }}
            alt=""
          />
        </AnimatePresence>
        <div className={styles.overlay}></div>
      </div>



      {/* Hero Content */}
      <div className={styles.hero}>
        <motion.div className={styles.badge} initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.7 }}>
          ✨ &nbsp;A Special Surprise Just For You&nbsp; ✨
        </motion.div>

        <motion.p className={styles.sub} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.7 }}>
          Today is your day, my love
        </motion.p>

        <motion.h1 className={styles.titleTop} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.8 }}>
          Happy Birthday
        </motion.h1>

        <motion.h1 className={styles.name} initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.7, duration:0.9, type:'spring', bounce:0.35 }}>
          Hasini <span className={styles.heartGlow}>💕</span>
        </motion.h1>

        <motion.p className={styles.tagline} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1, duration:0.8 }}>
          "Every moment with you is a treasure I'll keep forever"
        </motion.p>

        <motion.div className={styles.btnRow} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.15, duration:0.7 }}>
          <a
            href="#letter"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={styles.btnPrimary}
          >
            <span>Open Your Gift</span>
            <span className={styles.btnArrow}>🎁</span>
            <div className={styles.btnShimmer} />
          </a>
        </motion.div>

        <p className={styles.note}>💡 Add Hasini's photos to the <code>public/</code> folder and update Home.jsx</p>
      </div>
    </motion.div>
  )
}
