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
        <select value={sortField} onChange={e => onSortFieldChange(e.target.value as SortField)}>
          <option value="recettes_totales">Recettes</option>
          <option value="date_sortie">Date de sortie</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Ordre</label>
        <select value={sortOrder} onChange={e => onSortOrderChange(e.target.value as SortOrder)}>
          <option value="desc">Décroissant</option>
          <option value="asc">Croissant</option>
        </select>
      </div>
    </div>
  )
}
