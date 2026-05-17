import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, Cell
} from 'recharts'
import type { Movie } from '../../../shared/types/movie'

interface Props { movies: Movie[] }

const COLORS = [ '#4f46e5', '#6366f1', '#7c3aed', '#8b5cf6', '#a78bfa', '#b197fc', '#c4b5fd' ]

export function GenreStats({ movies }: Props) {
  const stats = useMemo(() => {
    const map = new Map<string, { count: number; revenue: number; scores: number[] }>()
    movies.forEach(m => {
      const genre = m.genre ?? 'Non classé'
      const existing = map.get(genre) ?? { count: 0, revenue: 0, scores: [] }
      map.set(genre, {
        count: existing.count + 1,
        revenue: existing.revenue + m.recettes_totales,
        scores: m.note_presse !== null ? [...existing.scores, m.note_presse] : existing.scores
      })
    })
    return Array.from(map.entries())
      .map(([genre, data]) => ({
        genre,
        films: data.count,
        recettes: Math.round(data.revenue / 1_000_000),
        note: data.scores.length > 0
          ? Math.round((data.scores.reduce((a, b) => a + b, 0) / data.scores.length) * 10) / 10
          : 0
      }))
      .sort((a, b) => b.recettes - a.recettes)
  }, [movies])

  return (
    <div className="genre-stats">
      <h2 className="section-title">Statistiques par genre</h2>
      <p className="section-subtitle">Vue d'ensemble sur l'intégralité du catalogue.</p>

      <div className="charts-grid">

        {/* Graphique 1 */}
        <div className="chart-card">
          <h3>Recettes totales par genre (M$)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="genre" tick={{ fontSize: 12 }} width={110} />
              <Tooltip formatter={(v) => [`${v} M$`, 'Recettes']} />
              <Bar dataKey="recettes" radius={[0, 6, 6, 0]}>
                {stats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique 2 */}
        <div className="chart-card">
          <h3>Note presse moyenne par genre</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={stats}>
              <PolarGrid />
              <PolarAngleAxis dataKey="genre" tick={{ fontSize: 11 }} />
              <Radar
                name="Note"
                dataKey="note"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.3}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique 3 */}
        <div className="chart-card">
        <h3>Nombre de films par genre</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
            <YAxis type="category" dataKey="genre" tick={{ fontSize: 12 }} width={110} />
            <Tooltip formatter={(v) => [`${v} film${Number(v) > 1 ? 's' : ''}`, 'Films']} />
            <Bar dataKey="films" radius={[0, 6, 6, 0]}>
                {stats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}