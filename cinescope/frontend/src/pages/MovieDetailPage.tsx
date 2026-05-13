import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Movie } from '../../../shared/types/movie'  //caca
import { moviesService } from '../services/movies.service'

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
  if (loading) return <div className="loading">Chargement...</div>
  if (!movie) return <div className="error">Film introuvable</div>
  const recettes = new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0
  }).format(movie.recettes_totales)
  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>{movie.titre}</h1>
      <div className="detail-grid">
        <div><strong>Genre</strong><span>{movie.genre ?? 'Non classé'}</span></div>
        <div><strong>Date de sortie</strong><span>{new Date(movie.date_sortie).toLocaleDateString('fr-FR')}</span></div>
        <div><strong>Recettes</strong><span>{recettes}</span></div>
        <div><strong>Entrées</strong><span>{movie.nombre_entrees.toLocaleString('fr-FR')}</span></div>
        <div><strong>Note presse</strong><span>{movie.note_presse ?? 'N/A'}/10</span></div>
        <div><strong>Durée</strong><span>{movie.duree_minutes} min</span></div>
        <div><strong>Pays</strong><span>{movie.pays_origine}</span></div>
        <div><strong>Distributeur</strong><span>{movie.distributeur}</span></div>
      </div>
      {similar.length > 0 && (
        <section className="similar">
          <h2>Films similaires</h2>
          <div className="similar-grid">
            {similar.map(m => (
              <div key={m.id} className="similar-card" onClick={() => navigate(`/movies/${m.id}`)}>
                <h3>{m.titre}</h3>
                <span>{m.genre}</span>
                <span>{m.note_presse}/10</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Algorithme de recommandation
// Score de similarité basé sur 3 critères pondérés :
// - Genre identique       → 50 points  (critère le plus important)
// - Proximité des recettes → 30 points  (normalisé sur l'écart max)
// - Proximité note presse  → 20 points  (normalisé sur 10)
function getSimilarMovies(target: Movie, allMovies: Movie[]): Movie[] {
  const maxRevenue = Math.max(...allMovies.map(m => m.recettes_totales))
  return allMovies
    .filter(m => m.id !== target.id)
    .map(m => {
      let score = 0
      // Critère 1 : genre
      if (m.genre && target.genre && m.genre === target.genre) score += 50
      // Critère 2 : recettes proche
      const revenueDiff = Math.abs(m.recettes_totales - target.recettes_totales)
      score += 30 * (1 - revenueDiff / maxRevenue)
      // Critère 3 : note presse proche
      if (m.note_presse !== null && target.note_presse !== null) {
        const scoreDiff = Math.abs(m.note_presse - target.note_presse)
        score += 20 * (1 - scoreDiff / 10)
      }
      return { movie: m, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.movie)
}
