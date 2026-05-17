import { useMovies } from '../hooks/useMovies'
import { usePagination } from '../hooks/usePagination'
import { StatsBar } from '../components/StatsBar'
import { Filters } from '../components/Filters'
import { MovieCard } from '../components/MovieCard'
import { Navbar } from '../components/NavBar'
import { GenreStats } from '../components/GenreStats'
import { Pagination } from '../components/Pagination'

export function HomePage() {
  const {
    loading, error, filteredMovies, genres, stats,
    selectedGenre, setSelectedGenre,
    sortField, setSortField,
    sortOrder, setSortOrder,
    search, setSearch,
    movies
  } = useMovies()

  const { paginated, page, setPage, totalPages } = usePagination(filteredMovies)

  if (loading) return <div className="loading"><div className="spinner" />Chargement...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <>
      <Navbar />

      <section className="hero">
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
          onGenreChange={(g) => { setSelectedGenre(g); setPage(1) }}
          sortField={sortField}
          onSortFieldChange={(f) => { setSortField(f); setPage(1) }}
          sortOrder={sortOrder}
          onSortOrderChange={(o) => { setSortOrder(o); setPage(1) }}
          search={search}
          onSearchChange={(value) => { setSearch(value); setPage(1) }}
        />
        <div className="movies-grid">
          {paginated.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      <section className="section section--dark" id="statistiques">
        <GenreStats movies={movies} />
      </section>

      <section id="apropos" className="about-section">
        <div className="about-card">
          <div className="about-content">
            <h2>À propos de Yourban Cinescope</h2>
            <p>
              Ce site a été réalisé dans le cadre d'un test technique pour une candidature en alternance.
              Il présente un catalogue de films avec des statistiques par genre, un système de filtres,
              de tri, et des pages de détail enrichies avec un algorithme de recommandation.
            </p>
            <span className="about-tag"> Test technique (Alternance)</span>
          </div>
        </div>
      </section>
    </>
  )
}