import { useNavigate } from 'react-router-dom'
import logoYourban from '../assets/logoyourban.png'

export function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <button className="navbar-logo-btn" onClick={() => navigate('/')}>
          <img src={logoYourban} alt="Yourban Cinescope" className="navbar-logo-image" />
        </button>

        <div className="navbar-links">
          <a href="/#catalogue">Catalogue</a>
          <a href="/#statistiques">Statistiques</a>
          <a href="/#apropos">À propos</a>
        </div>

      </div>
    </nav>
  )
}