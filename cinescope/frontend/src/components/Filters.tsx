import type { SortField, SortOrder } from '../hooks/useMovies'

interface Props {
  genres: string[]
  selectedGenre: string
  onGenreChange: (genre: string) => void
  sortField: SortField
  onSortFieldChange: (field: SortField) => void
  sortOrder: SortOrder
  onSortOrderChange: (order: SortOrder) => void
}

export function Filters({
  genres, selectedGenre, onGenreChange,
  sortField, onSortFieldChange,
  sortOrder, onSortOrderChange
}: Props) {
  return (
    <div className="filters">

      <div className="filter-group">
        <label>Genre</label>
        <select value={selectedGenre} onChange={e => onGenreChange(e.target.value)}>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Trier par</label>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${sortField === 'recettes_totales' ? 'toggle-btn--active' : ''}`}
            onClick={() => onSortFieldChange('recettes_totales')}
          >
            Recettes
          </button>
          <button
            className={`toggle-btn ${sortField === 'date_sortie' ? 'toggle-btn--active' : ''}`}
            onClick={() => onSortFieldChange('date_sortie')}
          >
            Date
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Ordre</label>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${sortOrder === 'desc' ? 'toggle-btn--active' : ''}`}
            onClick={() => onSortOrderChange('desc')}
          >
            Décroissant
          </button>
          <button
            className={`toggle-btn ${sortOrder === 'asc' ? 'toggle-btn--active' : ''}`}
            onClick={() => onSortOrderChange('asc')}
          >
            Croissant
          </button>
        </div>
      </div>

    </div>
  )
}