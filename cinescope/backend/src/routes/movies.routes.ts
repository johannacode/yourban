import { Router } from 'express'
import { moviesController } from '../controllers/movies.controller'
import { validateMovie } from '../middlewares/validate.middleware'

const router = Router()

// Le middleware validateMovie est appelé AVANT le controller sur POST et PUT
router.get('/', moviesController.getAll)
router.get('/:id', moviesController.getById)
router.post('/', validateMovie, moviesController.create)
router.put('/:id', validateMovie, moviesController.update)
router.delete('/:id', moviesController.delete)

export default router