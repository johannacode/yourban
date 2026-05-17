import { useNavigate } from 'react-router-dom'
import logoYourban from '../assets/logoyourban.png'

export function Navbar() {
  const navigate = useNavigate()

  function goTo(anchor: string) {
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
      </div>
    </nav>
  )
}