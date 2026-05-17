interface Props {
  totalFilms: number
  totalRecettes: number
  avgScore: number | null
}

export function StatsBar({ totalFilms, totalRecettes, avgScore }: Props) {
  const formatted = new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1
  }).format(totalRecettes)

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-card-label">FILMS AFFICHÉS</span>
        <span className="stat-card-value">{totalFilms}</span>
      </div>
      <div className="stat-card">
        <span className="stat-card-label">RECETTES CUMULÉES</span>
        <span className="stat-card-value">{formatted}</span>
      </div>
      <div className="stat-card">
        <span className="stat-card-label">NOTE PRESSE MOY.</span>
        <span className="stat-card-value">
          {avgScore !== null ? `${avgScore.toFixed(1)} / 10` : 'N/A'}
        </span>
      </div>
    </div>
  )
}