import { useState, useMemo } from 'react'
import type { Movie } from '../../../shared/types/movie'

const PAGE_SIZE = 6

export function usePagination(movies: Movie[]) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(movies.length / PAGE_SIZE)

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return movies.slice(start, start + PAGE_SIZE)
  }, [movies, page])

  const safePage = Math.min(page, totalPages || 1)
  if (safePage !== page) setPage(safePage)

  return { paginated, page, setPage, totalPages }
}