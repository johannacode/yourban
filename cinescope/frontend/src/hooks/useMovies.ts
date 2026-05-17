import { useState, useEffect, useMemo } from 'react'
import type { Movie } from '../../../shared/types/movie'   
import { moviesService } from '../services/movies.service'
export type SortField = 'recettes_totales' | 'date_sortie'
export type SortOrder = 'asc' | 'desc'
export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('Tous')
  const [sortField, setSortField] = useState<SortField>('recettes_totales')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
  useEffect(() => {
    moviesService.getAll()
      .then(setMovies)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  
  const genres = useMemo(() => {
    const all = movies
      .map(m => m.genre)
      .filter((g): g is string => g !== null) 
    return ['Tous', ...Array.from(new Set(all)).sort()]
  }, [movies])
  
  const filteredMovies = useMemo(() => {
    let result = [...movies]
    
    if (selectedGenre !== 'Tous') {
      result = result.filter(m => m.genre === selectedGenre)
    }
    
    result.sort((a, b) => {
      if (sortField === 'recettes_totales') {
        return sortOrder === 'desc'
          ? b.recettes_totales - a.recettes_totales
          : a.recettes_totales - b.recettes_totales
      } else {
        const dateA = new Date(a.date_sortie).getTime()
        const dateB = new Date(b.date_sortie).getTime()
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
      }
    })
    return result
  }, [movies, selectedGenre, sortField, sortOrder])
  
  const stats = useMemo(() => {
    const withScore = filteredMovies.filter(m => m.note_presse !== null)
    return {
      totalFilms: filteredMovies.length,
      totalRecettes: filteredMovies.reduce((sum, m) => sum + m.recettes_totales, 0),
      avgScore: withScore.length > 0
        ? withScore.reduce((sum, m) => sum + (m.note_presse ?? 0), 0) / withScore.length
        : null
    }
  }, [filteredMovies])
  return {
    loading,
    error,
    movies,
    filteredMovies,
    genres,
    stats,
    selectedGenre,
    setSelectedGenre,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    setMovies
  }
}
