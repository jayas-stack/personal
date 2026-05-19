import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Wishes.module.css'

const WISHES = [
  { n:'01', icon:'🌟', title:'Endless Happiness',    body:'May every single day of this year overflow with joy, laughter, and the kind of happiness that makes your heart sing all day long.' },
  { n:'02', icon:'🚀', title:'Big Dreams Come True', body:'May this be the year all your dreams take flight. You deserve every success, every win, every beautiful thing coming your way.' },
  { n:'03', icon:'💪', title:'Health & Strength',    body:'May you always be healthy, strong, and full of the energy to chase everything and everyone you love with passion and fire.' },
  { n:'04', icon:'🌈', title:'Beautiful Adventures', body:'May life take you on the most breathtaking adventures — and may I be lucky enough to be right beside you for all of them.' },
]

export default function Wishes() {

  return (
    <motion.div className={`page ${styles.page}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.6 }}>


      <div className="section">
        <motion.div className={styles.header} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <span className="tag">🎂 Birthday Wishes</span>
          <h1 className="sec-title">My Wishes For You</h1>
        </motion.div>

        <div className={styles.grid}>
          {WISHES.map((w, i) => (
            <motion.div key={i} className={`card ${styles.card}`}
              initial={{ opacity:0, y:40 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.35 + i * 0.15, duration:0.6 }}
            >
              <div className={styles.num}>{w.n}</div>
              <div className={styles.icon}>{w.icon}</div>
              <h3 className={styles.title}>{w.title}</h3>
              <p className={styles.body}>{w.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
