import { Request, Response, NextFunction } from 'express'

// Ce middleware vérifie que les champs obligatoires sont présents
// avant même d'appeler le controller
export function validateMovie(req: Request, res: Response, next: NextFunction): void {
  const { titre, date_sortie, recettes_totales, nombre_entrees, pays_origine, distributeur, duree_minutes } = req.body

  const errors: string[] = []

  if (!titre || typeof titre !== 'string') errors.push('titre requis (string)')
  if (!date_sortie || !/^\d{4}-\d{2}-\d{2}$/.test(date_sortie)) errors.push('date_sortie requise (format YYYY-MM-DD)')
  if (recettes_totales === undefined || typeof recettes_totales !== 'number') errors.push('recettes_totales requises (number)')
  if (nombre_entrees === undefined || typeof nombre_entrees !== 'number') errors.push('nombre_entrees requis (number)')
  if (!pays_origine || typeof pays_origine !== 'string') errors.push('pays_origine requis (string)')
  if (!distributeur || typeof distributeur !== 'string') errors.push('distributeur requis (string)')
  if (duree_minutes === undefined || typeof duree_minutes !== 'number') errors.push('duree_minutes requis (number)')

  if (errors.length > 0) {
    res.status(400).json({ errors })
    return
  }

  next() 
}