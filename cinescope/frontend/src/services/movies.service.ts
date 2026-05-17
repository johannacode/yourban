import type { Movie, CreateMovieDto, UpdateMovieDto } from '../../../shared/types/movie' 

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/movies'

export const moviesService = {
  async getAll(): Promise<Movie[]> {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Erreur lors du chargement des films')
    return res.json()
  },
  async getById(id: number): Promise<Movie> {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) throw new Error('Film introuvable')
    return res.json()
  },
  async create(data: CreateMovieDto): Promise<Movie> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Erreur lors de la création')
    return res.json()
  },
  async update(id: number, data: UpdateMovieDto): Promise<Movie> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Erreur lors de la modification')
    return res.json()
  },
  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erreur lors de la suppression')
  }
}
