import { Link } from 'react-router-dom'
import logoYourban from '../assets/logoyourban.png'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="navbar-logo">
          <img
            src={logoYourban}
            alt="Yourban Logo"
            className="navbar-logo-image"
          />
        </Link>

        <div className="navbar-links">
          <a href="#catalogue">Catalogue</a>
          <a href="#statistiques">Statistiques</a>
          <a href="#apropos">À propos</a>
        </div>

      </div>
    </nav>
  )
}