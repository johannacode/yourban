import { Request, Response } from 'express'
import { moviesService } from '../services/movies.service'

function getId(req: Request): number | null {
  const idParam = req.params.id
 
  if (typeof idParam !== 'string') return null

  const id = parseInt(idParam, 10)
  if (isNaN(id)) return null

  return id
}

export const moviesController = {

  // GET /api/movies
  getAll(req: Request, res: Response): void {
    const movies = moviesService.findAll()
    res.json(movies)
  },

  // GET /api/movies/:id
  getById(req: Request, res: Response): void {
    
    const id = getId(req)
    if (!id) {
      res.status(400).json({ error: 'ID invalide' })
      return
    }

    const movie = moviesService.findById(id)

    if (!movie) {
      res.status(404).json({ error: 'Film introuvable' })
      return
    }

    res.json(movie)
  },

  // POST /api/movies
  create(req: Request, res: Response): void {
    const movie = moviesService.create(req.body)
    res.status(201).json(movie)
  },

  // PUT /api/movies/:id
  update(req: Request, res: Response): void {

    const id = getId(req)
    if (!id) {
      res.status(400).json({ error: 'ID invalide' })
      return
    }

    const movie = moviesService.update(id, req.body)

    if (!movie) {
      res.status(404).json({ error: 'Film introuvable' })
      return
    }

    res.json(movie)
  },

  // DELETE /api/movies/:id
  delete(req: Request, res: Response): void {
    
    const id = getId(req)
    if (!id) {
      res.status(400).json({ error: 'ID invalide' })
      return
    }

    const deleted = moviesService.delete(id)

    if (!deleted) {
      res.status(404).json({ error: 'Film introuvable' })
      return
    }

    res.status(204).send()
  }
}