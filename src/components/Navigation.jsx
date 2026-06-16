import { useState, useEffect } from 'react'
import styles from './Navigation.module.css'

const LINKS = [
  { target: 'home',    icon: '🏠', label: 'Home'    },
  { target: 'letter',  icon: '💌', label: 'Letter'  },
  { target: 'gallery', icon: '📸', label: 'Gallery' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = LINKS.map(link => document.getElementById(link.target))
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const handleScroll = (id) => {
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
            handleScroll(target)
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

