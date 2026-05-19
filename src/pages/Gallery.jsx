import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Gallery.module.css'

// Default fallback images that the user can replace later
const IMAGES = [
  { id: 1, src: '/photos/photo1.jpg', fallback: '/photo_placeholder.png', caption: 'Your beautiful smile 💖' },
  { id: 2, src: '/photos/photo2.jpg', fallback: '/photo_placeholder.png', caption: 'Every moment is a memory 🌟' },
  { id: 3, src: '/photos/photo3.jpg', fallback: '/photo_placeholder.png', caption: 'My favorite view in the world ✨' },
  { id: 4, src: '/photos/photo4.jpg', fallback: '/photo_placeholder.png', caption: 'Warmth and laughter with you 💕' },
  { id: 5, src: '/photos/photo5.jpg', fallback: '/photo_placeholder.png', caption: 'A special day, a beautiful soul 🌸' },
  { id: 6, src: '/photos/photo6.jpg', fallback: '/photo_placeholder.png', caption: 'Always and forever, my love 🥂' },
]

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  // Handle image loading error to fallback gracefully
  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const openLightbox = (index) => {
    setActiveIdx(index)
  }

  const closeLightbox = () => {
    setActiveIdx(null)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev + 1) % IMAGES.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev - 1 + IMAGES.length) % IMAGES.length)
  }

  return (
    <motion.div 
      className={`page ${styles.gallerySection}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section">
        
        {/* Header */}
        <div className={styles.header}>
          <span className="tag">📸 Photo Album</span>
          <h1 className="sec-title">Our Cinematic Journey</h1>
          <p className={styles.subtitle}>
            A gallery of the most beautiful moments we've shared. Tap any picture to open it.
          </p>
        </div>

        {/* Image Grid */}
        <div className={styles.grid}>
          {IMAGES.map((img, idx) => {
            const hasError = imageErrors[img.id]
            const displaySrc = hasError ? img.fallback : img.src

            return (
              <motion.div 
                key={img.id}
                className={styles.card}
                onClick={() => openLightbox(idx)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={displaySrc} 
                    alt={img.caption} 
                    className={styles.image}
                    onError={() => handleImageError(img.id)}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.zoomIcon}>🔍</span>
                    <p className={styles.hoverCaption}>{img.caption}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className={styles.tip}>
          💡 <strong>Tip:</strong> Simply place your photos in the <code>public/photos/</code> folder named <code>photo1.jpg</code>, <code>photo2.jpg</code>, etc. to replace the placeholders!
        </p>

      </div>

      {/* Cinematic Fullscreen Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={closeLightbox}>✕</button>

            {/* Navigation Buttons */}
            <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevImage}>
              ⟨
            </button>
            <button className={`${styles.navBtn} ${styles.next}`} onClick={nextImage}>
              ⟩
            </button>

            {/* Content Container */}
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <motion.div 
                key={activeIdx}
                className={styles.lightboxImgWrapper}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={imageErrors[IMAGES[activeIdx].id] ? IMAGES[activeIdx].fallback : IMAGES[activeIdx].src} 
                  alt={IMAGES[activeIdx].caption} 
                  className={styles.lightboxImg}
                />
                <div className={styles.lightboxCaptionPanel}>
                  <span className={styles.lightboxIndex}>{activeIdx + 1} / {IMAGES.length}</span>
                  <p className={styles.lightboxCaption}>{IMAGES[activeIdx].caption}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
