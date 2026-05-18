import fs from 'fs'
import path from 'path'
import type { Movie, CreateMovieDto, UpdateMovieDto } from '../../../shared/types/movie'  

// Chemin vers le fichier JSON
const DATA_PATH = path.join(process.cwd(), '../data/movies.json')

function readMovies(): Movie[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Movie[]
}

// Écrit dans le fichier JSON
function writeMovies(movies: Movie[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(movies, null, 2), 'utf-8')
}

export const moviesService = {

  findAll(): Movie[] {
    return readMovies()
  },

  findById(id: number): Movie | undefined {
    return readMovies().find(m => m.id === id)
  },

  create(data: CreateMovieDto): Movie {
    const movies = readMovies()
    const newId = Math.max(...movies.map(m => m.id)) + 1
    const newMovie: Movie = { id: newId, ...data }
    movies.push(newMovie)
    writeMovies(movies)
    return newMovie
  },

  update(id: number, data: UpdateMovieDto): Movie | null {
    const movies = readMovies()
    const index = movies.findIndex(m => m.id === id)
    if (index === -1) return null
    movies[index] = { ...movies[index], ...data }
    writeMovies(movies)
    return movies[index]
  },

  delete(id: number): boolean {
    const movies = readMovies()
    const index = movies.findIndex(m => m.id === id)
    if (index === -1) return false
    movies.splice(index, 1)
    writeMovies(movies)
    return true
  }
}