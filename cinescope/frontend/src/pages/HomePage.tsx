import { useMovies } from '../hooks/useMovies'
import { StatsBar } from '../components/StatsBar'
import { Filters } from '../components/Filters'
import { MovieCard } from '../components/MovieCard'
import { Navbar } from '../components/NavBar'
import { GenreStats } from '../components/GenreStats'

export function HomePage() {
  const {
    loading, error, filteredMovies, genres, stats,
    selectedGenre, setSelectedGenre,
    sortField, setSortField,
    sortOrder, setSortOrder,
    movies
  } = useMovies()

  if (loading) return <div className="loading">Chargement...</div>
  if (error) return <div className="error">{error}</div>
  
  return (
    <main>
      <Navbar />
      <section className="hero">
        <div className="hero-badge">● Données 2022 – 2024</div>
        <h1 className="hero-title">
          Notre box-office,<br />
          <span className="hero-accent">en un coup d'œil.</span>
        </h1>
        <p className="hero-subtitle">
          Filtrez par genre, triez par recettes ou date, et plongez dans les chiffres de chaque film.
        </p>
        <StatsBar
          totalFilms={stats.totalFilms}
          totalRecettes={stats.totalRecettes}
          avgScore={stats.avgScore}
        />
      </section>
      <section className="section" id="catalogue">
        <Filters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="section section--dark" id="statistiques">
        <GenreStats movies={movies} />
      </section>

    </main>
  )
}