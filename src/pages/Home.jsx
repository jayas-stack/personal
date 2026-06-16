import { motion } from 'framer-motion'
import styles from './Home.module.css'

export default function Home() {

  return (
    <motion.div className={`page ${styles.home}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>

      {/* Clean dark background */}
      <div className={styles.heroBg} />





      {/* Hero Content */}
      <div className={styles.hero}>

        <motion.h1 className={styles.titleTop} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}>
          Happy Birthday
        </motion.h1>

        <motion.h1 className={styles.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.9, type: 'spring', bounce: 0.35 }}>
          Haasini
        </motion.h1>

        <motion.p className={styles.tagline} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
          Every moment with you is a treasure I'll keep forever
        </motion.p>


        <p className={styles.note}>Wishing you the most beautiful day filled with love and laughter! </p>
      </div>
    </motion.div>
  )
}
