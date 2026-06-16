import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Letter.module.css'

const LETTER = [
  "My Dearest Hasini,",
  "Last ki 19 years ochesai entha ochina inka nuv pilla bacha yea..",
  "Chepali antey na life lo nuvvey VVIP anthakanaa ekkuvey ley neetho unna prathi vishayam naaku gurthu unnai and happy ga undhi antey adhi nee valley. ",
  "Sorry, manam entha happy ga close ga unna nenu chaala tappulu chesa, kani I always love you and I always wanted to be with you. I think inka aa time ipoyindi kaani... inka nuv gurthu osthuney unnaav ",
  "Neetho antha possessive ga undadanki nuv naaku rakhi kataav nijam ga naaku own sister unna antha care cheynu nuv naaku anthakanaa ekkuva and nuv inter lo edho evarli valla ina suffer ayaav ankunna andhukey antha serious ga unaa but navallaney neeku chaala trouble ayindhi.",
  "I promise inka na valla neeku elanti problem undadhu and emina problem osthey nenu unna ani marchipoku.",
  "I love you so much and neekosam emina chestha aa kopam kuda nee meedha prema ekkuva avadam valley ochindhi.",
  "Sarey ley ipaadikey ekkuva chepesa Once Again HAPPY BIRTHDAY bangaram and be happy."
]

const envelopeVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      bounce: 0.25,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

export default function Letter() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <motion.div className={`page ${styles.page}`} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6 }}>


      <div className="section" style={{ maxWidth: 820 }}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="sec-title">A Letter Just For You</h1>
        </motion.div>

        <div style={{ position: 'relative', minHeight: '320px' }}>
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="closed-envelope"
                className={styles.envelopeClosed}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsOpened(true)}
              >
                <h2 className={styles.envelopeTitle}>For My Favorite Person</h2>
                <p className={styles.envelopeSubtitle}>Click the wax seal to open this letter</p>
                
                <motion.button
                  className={styles.waxSealButton}
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpened(true)
                  }}
                  aria-label="Open Letter"
                >
                  💕
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-letter"
                className={`card ${styles.envelope}`}
                variants={envelopeVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >


                {/* Seal */}
                <div className={styles.seal}>💕</div>

                <div className={styles.inner}>
                  {LETTER.map((para, i) => (
                    <motion.p key={i}
                      className={i === 0 ? styles.greeting : styles.body}
                      variants={childVariants}
                    >
                      {para}
                    </motion.p>
                  ))}

                  <motion.div className={styles.sign} variants={childVariants}>
                    <p>With all my love,</p>
                    <p className={styles.signName}>Your Annaya</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>



      </div>
    </motion.div>
  )
}
