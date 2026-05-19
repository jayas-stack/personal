import styles from './Navigation.module.css'

const LINKS = [
  { target: 'home',    icon: '🏠', label: 'Home'    },
  { target: 'gallery', icon: '📸', label: 'Gallery' },
  { target: 'letter',  icon: '💌', label: 'Letter'  },
]

export default function Navigation({ activeSection }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main Navigation">
      {LINKS.map(({ target, icon, label }) => (
        <a
          key={target}
          href={`#${target}`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(target)
          }}
          className={`${styles.item} ${activeSection === target ? styles.active : ''}`}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </a>
      ))}
    </nav>
  )
}

