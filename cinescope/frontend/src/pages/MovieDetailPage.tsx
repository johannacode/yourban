import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Movie } from '../../../shared/types/movie'
import { moviesService } from '../services/movies.service'
import { Navbar } from '../components/NavBar'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [similar, setSimilar] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      moviesService.getById(parseInt(id)),
      moviesService.getAll()
    ]).then(([currentMovie, allMovies]) => {
      setMovie(currentMovie)
      setSimilar(getSimilarMovies(currentMovie, allMovies))
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading"><div className="spinner" />Chargement...</div>
  if (!movie) return <div className="error">Film introuvable</div>

  const recettes = new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(movie.recettes_totales)

  const date = new Date(movie.date_sortie).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <>
      <Navbar />

      <div className="detail-page">
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          ← Retour
        </button>

        <div className="detail-hero">
          <div className="detail-hero-top">
            <h1>{movie.titre}</h1>
            <div className="detail-badges">
              {movie.genre && (
                <span className="detail-badge detail-badge--genre">{movie.genre}</span>
              )}
              {movie.note_presse !== null ? (
                <span className="detail-badge detail-badge--score">{movie.note_presse}/10</span>
              ) : (
                <span className="detail-badge detail-badge--score-na">Non noté</span>
              )}
            </div>
          </div>
          <div className="detail-meta-row">
            <span>{date}</span>
            <span>{movie.duree_minutes} min</span>
            <span>{movie.pays_origine}</span>
            <span>{movie.distributeur}</span>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <strong>Recettes</strong>
            <span>{recettes}</span>
          </div>
          <div>
            <strong>Entrées</strong>
            <span>{movie.nombre_entrees.toLocaleString('fr-FR')}</span>
          </div>
          <div>
            <strong>Note presse</strong>
            <span>{movie.note_presse !== null ? `${movie.note_presse}/10` : 'Non noté'}</span>
          </div>
          <div>
            <strong>Durée</strong>
            <span>{movie.duree_minutes} min</span>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="similar">
            <h2>Films similaires</h2>
            <div className="similar-grid">
              {similar.map(m => (
                <div key={m.id} className="similar-card" onClick={() => navigate(`/movies/${m.id}`)}>
                  <h3>{m.titre}</h3>
                  {m.genre && <span className="similar-genre">{m.genre}</span>}
                  <span className="similar-score">
                    {m.note_presse !== null ? `${m.note_presse}/10` : 'Non noté'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

//Logique de l'algorithme expliqué dans le README.md 
function getSimilarMovies(target: Movie, allMovies: Movie[]): Movie[] {
  const maxRevenue = Math.max(...allMovies.map(m => m.recettes_totales))
  return allMovies
    .filter(m => m.id !== target.id)
    .map(m => {
      let score = 0
      if (m.genre && target.genre && m.genre === target.genre) score += 50
      const revenueDiff = Math.abs(m.recettes_totales - target.recettes_totales)
      score += 30 * (1 - revenueDiff / maxRevenue)
      if (m.note_presse !== null && target.note_presse !== null) {
        score += 20 * (1 - Math.abs(m.note_presse - target.note_presse) / 10)
      }
      return { movie: m, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.movie)
}