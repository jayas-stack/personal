import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Reasons.module.css'

const REASONS = [
  { icon:'😊', front:'Your Smile',       back:'It is genuinely the most beautiful thing I have ever seen. It makes every hard day feel completely worth it.' },
  { icon:'🧠', front:'Your Intelligence', back:'You are so incredibly smart and thoughtful. Every conversation with you makes me a better person.' },
  { icon:'💪', front:'Your Strength',     back:'The way you handle life with grace and courage inspires me more than you will ever know.' },
  { icon:'🎨', front:'Your Creativity',   back:'You see beauty in everything and make the whole world more colourful just by being in it.' },
  { icon:'🤗', front:'Your Kindness',     back:'Your heart is so big and pure. You care deeply and it shows in absolutely everything you do.' },
  { icon:'✨', front:'Just Being You',    back:'You are perfectly, wonderfully, beautifully you — and that is my absolute favourite thing in the entire world.' },
]

function FlipCard({ icon, front, back, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div className={styles.flipOuter}
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay: 0.2 + index * 0.12, duration:0.6 }}
      onClick={() => setFlipped(f => !f)}
      role="button" tabIndex={0} aria-label={front}
    >
      <motion.div className={styles.flipInner} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration:0.6, type:'spring', bounce:0.2 }}>
        {/* Front */}
        <div className={`card ${styles.face} ${styles.front}`}>
          <div className={styles.fIcon}>{icon}</div>
          <h3 className={styles.fTitle}>{front}</h3>
          <p className={styles.fHint}>Tap to reveal 💕</p>
        </div>
        {/* Back */}
        <div className={`card ${styles.face} ${styles.back}`}>
          <div className={styles.bIcon}>💕</div>
          <p className={styles.bText}>{back}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <motion.div className={`page ${styles.page}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.6 }}>
      <div className="section">
        <motion.div className={styles.header} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <span className="tag">💖 Just For You</span>
          <h1 className="sec-title">Why You're So Amazing</h1>
          <p className={styles.sub}>Tap each card to reveal 🌸</p>
        </motion.div>

        <div className={styles.grid}>
          {REASONS.map((r, i) => <FlipCard key={i} index={i} {...r} />)}
        </div>


      </div>
    </motion.div>
  )
}
