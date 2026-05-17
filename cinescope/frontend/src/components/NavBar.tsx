import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoYourban from '../assets/logoyourban.png'

export function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function goTo(anchor: string) {
    setMenuOpen(false)
    navigate('/')
    setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="navbar-logo-btn" onClick={() => navigate('/')}>
          <img src={logoYourban} alt="Yourban Cinescope" className="navbar-logo-image" />
        </button>

        <div className="navbar-links">
          <a onClick={() => goTo('catalogue')} style={{ cursor: 'pointer' }}>Catalogue</a>
          <a onClick={() => goTo('statistiques')} style={{ cursor: 'pointer' }}>Statistiques</a>
          <a onClick={() => goTo('apropos')} style={{ cursor: 'pointer' }}>À propos</a>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          <a onClick={() => goTo('catalogue')}>Catalogue</a>
          <a onClick={() => goTo('statistiques')}>Statistiques</a>
          <a onClick={() => goTo('apropos')}>À propos</a>
        </div>
      )}
    </nav>
  )
}