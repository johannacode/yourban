import type { Movie } from '../../../shared/types/movie'  //caca
import { useNavigate } from 'react-router-dom'
interface Props {
  movie: Movie
}
export function MovieCard({ movie }: Props) {
  const navigate = useNavigate()
  const recettes = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(movie.recettes_totales)
  const date = new Date(movie.date_sortie).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return (
    <div className="movie-card" onClick={() => navigate(`/movies/${movie.id}`)}>
      <div className="movie-genre">{movie.genre ?? 'Non classé'}</div>
      <h3 className="movie-title">{movie.titre}</h3>
      <div className="movie-meta">
        <span>{date}</span>
        <span>{recettes}</span>
      </div>
      <div className="movie-score">
        {movie.note_presse !== null
          ? <span className="score">{movie.note_presse}/10</span>
          : <span className="score-na">N/A</span>
        }
      </div>
    </div>
  )
}
