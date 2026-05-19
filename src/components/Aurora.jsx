import styles from './Aurora.module.css'

export default function Aurora() {
  return (
    <div className={styles.aurora} aria-hidden>
      <div className={styles.blob} data-n="1" />
      <div className={styles.blob} data-n="2" />
      <div className={styles.blob} data-n="3" />
      <div className={styles.blob} data-n="4" />
    </div>
  )
}
