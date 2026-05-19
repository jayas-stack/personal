import { motion } from 'framer-motion'
import styles from './Letter.module.css'

const LETTER = [
  "My Dearest Hasini,",
  "On this beautiful day, I want you to know just how incredibly special you are to me. Your smile lights up every room you walk into, and your laugh is genuinely the best sound in the world. 🌟",
  "You bring so much joy, warmth, and colour into my life every single day. Being with you feels like the greatest adventure — one I never want to end. You are my sunshine on cloudy days, my calm in every storm, and my absolute favourite person in the entire universe. 💫",
  "The way you care, the way you think, the way you see beauty in everything around you — it all makes me fall for you over and over again. I am so lucky that of all the people in the world, I get to be yours.",
  "Today, on your special day, I hope you feel as loved, cherished, and celebrated as you deserve. May this year bring you everything your beautiful heart desires — happiness, success, health, and the most wonderful memories. 🎉",
  "Happy Birthday, my love. Here's to you — and to us. Always. 🥂",
]

export default function Letter() {
  return (
    <motion.div className={`page ${styles.page}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.6 }}>
      <div className="section" style={{ maxWidth: 820 }}>

        <motion.div className={styles.header} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <span className="tag">💌 From the Heart</span>
          <h1 className="sec-title">A Letter Just For You</h1>
        </motion.div>

        <motion.div className={`card ${styles.envelope}`} initial={{ opacity:0, scale:0.92, y:30 }} animate={{ opacity:1, scale:1, y:0 }} transition={{ delay:0.4, duration:0.8, type:'spring', bounce:0.25 }}>

          {/* Decorative corners */}
          <span className={`${styles.decor} ${styles.tl}`}>🌹</span>
          <span className={`${styles.decor} ${styles.tr}`}>🌸</span>
          <span className={`${styles.decor} ${styles.bl}`}>🌷</span>
          <span className={`${styles.decor} ${styles.br}`}>✨</span>

          {/* Seal */}
          <div className={styles.seal}>💕</div>

          <div className={styles.inner}>
            {LETTER.map((para, i) => (
              <motion.p key={i}
                className={i === 0 ? styles.greeting : styles.body}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.6 + i * 0.15, duration:0.6 }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div className={styles.sign} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.6 + LETTER.length * 0.15 + 0.2 }}>
              <p>With all my love,</p>
              <p className={styles.signName}>Always Yours 💕</p>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </motion.div>
  )
}
