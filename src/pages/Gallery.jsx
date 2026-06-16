import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Gallery.module.css'

// 39 photos – shuffled so real photos & screenshots are interleaved
const IMAGES = [
  { id: 1,  src: '/photos/IMG-20250913-WA0001 (2).jpg',                   fallback: '/photo_placeholder.png' },
  { id: 22, src: '/photos/Screenshot 2026-04-15 130433.png',              fallback: '/photo_placeholder.png' },
  { id: 35, src: '/photos/Snapchat-1304437333.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 14, src: '/photos/Screenshot 2026-04-15 123019.png',              fallback: '/photo_placeholder.png' },
  { id: 3,  src: '/photos/IMG-20260430-WA0018.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 29, src: '/photos/Screenshot 2026-04-15 210522.png',              fallback: '/photo_placeholder.png' },
  { id: 38, src: '/photos/WhatsApp Image 2026-05-30 at 4.37.48 PM.jpeg', fallback: '/photo_placeholder.png' },
  { id: 10, src: '/photos/Screenshot 2026-04-15 122754.png',              fallback: '/photo_placeholder.png' },
  { id: 5,  src: '/photos/IMG-20260430-WA0020 (2).jpg',                   fallback: '/photo_placeholder.png' },
  { id: 26, src: '/photos/Screenshot 2026-04-15 210052.png',              fallback: '/photo_placeholder.png' },
  { id: 39, src: '/photos/WhatsApp Image 2026-05-30 at 4.38.33 PM.jpeg', fallback: '/photo_placeholder.png' },
  { id: 17, src: '/photos/Screenshot 2026-04-15 123607.png',              fallback: '/photo_placeholder.png' },
  { id: 33, src: '/photos/Screenshot 2026-04-15 211138.png',              fallback: '/photo_placeholder.png' },
  { id: 8,  src: '/photos/Screenshot 2026-04-15 122634.png',              fallback: '/photo_placeholder.png' },
  { id: 2,  src: '/photos/IMG-20260430-WA0015.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 23, src: '/photos/Screenshot 2026-04-15 131021.png',              fallback: '/photo_placeholder.png' },
  { id: 36, src: '/photos/Snapchat-1739867353.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 18, src: '/photos/Screenshot 2026-04-15 124232.png',              fallback: '/photo_placeholder.png' },
  { id: 6,  src: '/photos/IMG-20260430-WA0021.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 31, src: '/photos/Screenshot 2026-04-15 210744.png',              fallback: '/photo_placeholder.png' },
  { id: 4,  src: '/photos/IMG-20260430-WA0019.jpg',                       fallback: '/photo_placeholder.png' },
  { id: 13, src: '/photos/Screenshot 2026-04-15 122941.png',              fallback: '/photo_placeholder.png' },
  { id: 37, src: '/photos/Snapchat-789258117 (2).jpg',                    fallback: '/photo_placeholder.png' },
  { id: 27, src: '/photos/Screenshot 2026-04-15 210115.png',              fallback: '/photo_placeholder.png' },
  { id: 20, src: '/photos/Screenshot 2026-04-15 124635.png',              fallback: '/photo_placeholder.png' },
  { id: 34, src: '/photos/Screenshot 2026-04-15 212402.png',              fallback: '/photo_placeholder.png' },
  { id: 7,  src: '/photos/IMG-20260430-WA0031 (2).jpg',                   fallback: '/photo_placeholder.png' },
  { id: 25, src: '/photos/Screenshot 2026-04-15 205459.png',              fallback: '/photo_placeholder.png' },
  { id: 11, src: '/photos/Screenshot 2026-04-15 122840.png',              fallback: '/photo_placeholder.png' },
  { id: 30, src: '/photos/Screenshot 2026-04-15 210608.png',              fallback: '/photo_placeholder.png' },
  { id: 9,  src: '/photos/Screenshot 2026-04-15 122719.png',              fallback: '/photo_placeholder.png' },
  { id: 21, src: '/photos/Screenshot 2026-04-15 124929.png',              fallback: '/photo_placeholder.png' },
  { id: 16, src: '/photos/Screenshot 2026-04-15 123418.png',              fallback: '/photo_placeholder.png' },
  { id: 28, src: '/photos/Screenshot 2026-04-15 210409.png',              fallback: '/photo_placeholder.png' },
  { id: 15, src: '/photos/Screenshot 2026-04-15 123129.png',              fallback: '/photo_placeholder.png' },
  { id: 24, src: '/photos/Screenshot 2026-04-15 205355.png',              fallback: '/photo_placeholder.png' },
  { id: 32, src: '/photos/Screenshot 2026-04-15 211031.png',              fallback: '/photo_placeholder.png' },
  { id: 12, src: '/photos/Screenshot 2026-04-15 122910.png',              fallback: '/photo_placeholder.png' },
  { id: 19, src: '/photos/Screenshot 2026-04-15 124614.png',              fallback: '/photo_placeholder.png' },
]

// Page entrance
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.5 } },
}

// Staggered card reveal
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.045,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

// Photo Card Component (No Tilt or Hover Animations)
function PhotoCard({ img, i, setLightboxIdx, imageErrors, handleImageError, cardVariants }) {
  const src = imageErrors[img.id] ? img.fallback : img.src

  return (
    <motion.div
      className={styles.sliderCard}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={i % 8}
      onClick={() => {
        const originalIndex = IMAGES.findIndex(item => item.id === img.id);
        setLightboxIdx(originalIndex);
      }}
    >
      <img
        src={src}
        alt={`Memory ${img.id}`}
        className={styles.sliderImg}
        onError={() => handleImageError(img.id)}
        loading="lazy"
      />
    </motion.div>
  )
}

export default function Gallery() {
  const [imageErrors, setImageErrors] = useState({})
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const handleImageError = (id) =>
    setImageErrors(prev => ({ ...prev, [id]: true }))

  const showPrev = (e) => {
    if (e) e.stopPropagation()
    setLightboxIdx(prev => (prev === 0 ? IMAGES.length - 1 : prev - 1))
  }
  const showNext = (e) => {
    if (e) e.stopPropagation()
    setLightboxIdx(prev => (prev === IMAGES.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') showNext()
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'Escape') setLightboxIdx(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx])
  const row1 = IMAGES.filter((_, idx) => idx % 3 === 0);
  const row2 = IMAGES.filter((_, idx) => idx % 3 === 1);
  const row3 = IMAGES.filter((_, idx) => idx % 3 === 2);

  return (
    <motion.div
      className={`page ${styles.gallerySection}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="section">

        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="sec-title">Ee photos yea unnai</h1>
          <p className={styles.subtitle}>
            yea photos ina bontav leyy...
          </p>
        </motion.div>

      </div>

      {/* ── Infinite Horizontal Photo Slider – full bleed, no padding ── */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrackLeft}>
          {[...row1, ...row1].map((img, i) => (
            <PhotoCard 
              key={`r1-${img.id}-${i}`}
              img={img}
              i={i}
              setLightboxIdx={setLightboxIdx}
              imageErrors={imageErrors}
              handleImageError={handleImageError}
              cardVariants={cardVariants}
            />
          ))}
        </div>
        <div className={styles.sliderTrackRight}>
          {[...row2, ...row2].map((img, i) => (
            <PhotoCard 
              key={`r2-${img.id}-${i}`}
              img={img}
              i={i}
              setLightboxIdx={setLightboxIdx}
              imageErrors={imageErrors}
              handleImageError={handleImageError}
              cardVariants={cardVariants}
            />
          ))}
        </div>
        <div className={styles.sliderTrackLeft}>
          {[...row3, ...row3].map((img, i) => (
            <PhotoCard 
              key={`r3-${img.id}-${i}`}
              img={img}
              i={i}
              setLightboxIdx={setLightboxIdx}
              imageErrors={imageErrors}
              handleImageError={handleImageError}
              cardVariants={cardVariants}
            />
          ))}
        </div>
      </div>

      <div className="section">

        {/* ── Premium Fullscreen Lightbox ── */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <motion.div
              className={styles.lightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIdx(null)}
            >
              <button className={styles.closeBtn} onClick={() => setLightboxIdx(null)} aria-label="Close">✕</button>

              <button className={`${styles.navBtn} ${styles.prev}`} onClick={showPrev} aria-label="Previous">‹</button>

              <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.lightboxImgWrapper}>
                  <motion.img
                    key={lightboxIdx}
                    src={imageErrors[IMAGES[lightboxIdx].id] ? IMAGES[lightboxIdx].fallback : IMAGES[lightboxIdx].src}
                    alt={`Memory ${IMAGES[lightboxIdx].id}`}
                    className={styles.lightboxImg}
                    initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
                    animate={{ opacity: 1, scale: 1,    rotateY:  0 }}
                    exit={{    opacity: 0, scale: 0.92, rotateY:  8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onError={() => handleImageError(IMAGES[lightboxIdx].id)}
                  />
                </div>
              </div>

              <button className={`${styles.navBtn} ${styles.next}`} onClick={showNext} aria-label="Next">›</button>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </motion.div>
  )
}
