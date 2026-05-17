import type { Movie } from '../../../shared/types/movie'
import { useNavigate } from 'react-router-dom'

interface Props { movie: Movie }

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate()

  const recettes = new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1
  }).format(movie.recettes_totales ?? 0)

  const date = new Date(movie.date_sortie).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
  })

  return (
    <div className="movie-card" onClick={() => navigate(`/movies/${movie.id}`)}>

      <div className="movie-card-top">
        <h3 className="movie-title">{movie.titre}</h3>
        <div className="movie-score">
          {movie.note_presse !== null
            ? <span className="score">{movie.note_presse}/10</span>
            : <span className="score-na">non noté</span>
          }
        </div>
      </div>

      <div className="movie-date">{date}</div>

      <div className="movie-card-bottom">
        <span className="movie-genre">{movie.genre ?? 'Non classé'}</span>
        <span className="movie-revenue">{recettes}</span>
      </div>

    </div>
  )
}